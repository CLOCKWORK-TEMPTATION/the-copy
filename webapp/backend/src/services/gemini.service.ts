import { GoogleGenerativeAI } from '@google/generative-ai';
import { env } from '@/config/env';
import { logger } from '@/utils/logger';
import { cacheService } from './cache.service';
import { trackGeminiRequest, trackGeminiCache } from '@/middleware/metrics.middleware';
import {
  generateGeminiCacheKey,
  getGeminiCacheTTL,
  cachedGeminiCall,
  getAdaptiveTTL,
} from './gemini-cache.strategy';

export class GeminiService {
  private genAI: GoogleGenerativeAI;
  private model: any;
  private readonly REQUEST_TIMEOUT = 30000; // 30 seconds
  private static instance: GeminiService;

  constructor() {
    const apiKey = env.GOOGLE_GENAI_API_KEY;
    if (!apiKey) {
      throw new Error('GOOGLE_GENAI_API_KEY غير محدد في البيئة');
    }
    this.genAI = new GoogleGenerativeAI(apiKey);
    this.model = this.genAI.getGenerativeModel({ model: 'gemini-2.0-flash-exp' });
  }

  static getInstance(): GeminiService {
    if (!GeminiService.instance) {
      GeminiService.instance = new GeminiService();
    }
    return GeminiService.instance;
  }

  async analyzeText(text: string, analysisType: string): Promise<string> {
    const startTime = Date.now();

    // Generate optimized cache key
    const cacheKey = generateGeminiCacheKey('analysis', { text, analysisType });

    // Get cache stats for adaptive TTL
    const stats = cacheService.getStats();
    const ttl = getAdaptiveTTL(analysisType, stats.hitRate);

    logger.debug(`Using adaptive TTL: ${ttl}s (hit rate: ${stats.hitRate}%)`);

    try {
      // Use cached call with stale-while-revalidate for better UX
      const result = await cachedGeminiCall(
        cacheKey,
        ttl,
        async () => {
          const prompt = this.buildPrompt(text, analysisType);

          // Add timeout to prevent hanging requests
          const apiResult = await Promise.race([
            this.model.generateContent(prompt),
            new Promise((_, reject) =>
              setTimeout(() => reject(new Error('Gemini request timeout')), this.REQUEST_TIMEOUT)
            ),
          ]);

          return (apiResult as any).response.text();
        },
        {
          staleWhileRevalidate: true,
          staleTTL: ttl * 2, // Keep stale data for 2x TTL
        }
      );

      // Track metrics
      const duration = Date.now() - startTime;
      trackGeminiRequest(analysisType, duration, true);
      trackGeminiCache(result !== null);

      return result;
    } catch (error) {
      // Track failed request
      const duration = Date.now() - startTime;
      trackGeminiRequest(analysisType, duration, false);
      trackGeminiCache(false);

      logger.error('Gemini analysis failed:', error);
      throw new Error('فشل في تحليل النص باستخدام الذكاء الاصطناعي');
    }
  }

  async reviewScreenplay(text: string): Promise<string> {
    const startTime = Date.now();

    // Generate optimized cache key
    const cacheKey = generateGeminiCacheKey('screenplay', { text });

    // Get TTL for screenplay review
    const ttl = getGeminiCacheTTL('screenplay');

    const prompt = `أنت خبير في كتابة السيناريوهات العربية. قم بمراجعة النص التالي وقدم ملاحظات على:
1. استمرارية الحبكة
2. تطور الشخصيات
3. قوة الحوار
4. التناقضات في النص

قدم اقتراحات محددة لتحسين النص مع الحفاظ على الأسلوب العربي الأصيل.

النص:
${text}`;

    try {
      const result = await cachedGeminiCall(
        cacheKey,
        ttl,
        async () => {
          // Add timeout
          const apiResult = await Promise.race([
            this.model.generateContent(prompt),
            new Promise((_, reject) =>
              setTimeout(() => reject(new Error('Gemini request timeout')), this.REQUEST_TIMEOUT)
            ),
          ]);

          return (apiResult as any).response.text();
        },
        {
          staleWhileRevalidate: true,
          staleTTL: ttl * 2,
        }
      );

      const duration = Date.now() - startTime;
      trackGeminiRequest('screenplay', duration, true);

      return result;
    } catch (error) {
      const duration = Date.now() - startTime;
      trackGeminiRequest('screenplay', duration, false);

      logger.error('Screenplay review failed:', error);
      throw new Error('فشل في مراجعة السيناريو');
    }
  }

  async chatWithAI(message: string, context?: any): Promise<string> {
    const startTime = Date.now();

    try {
      // Build context-aware prompt
      let prompt = message;
      if (context) {
        prompt = `السياق: ${JSON.stringify(context, null, 2)}\n\nالسؤال: ${message}`;
      }

      // Generate cache key with context
      const cacheKey = generateGeminiCacheKey('chat', { message, context });
      const ttl = getGeminiCacheTTL('chat');

      const result = await cachedGeminiCall(
        cacheKey,
        ttl,
        async () => {
          // Add timeout
          const apiResult = await Promise.race([
            this.model.generateContent(prompt),
            new Promise((_, reject) =>
              setTimeout(() => reject(new Error('Gemini request timeout')), this.REQUEST_TIMEOUT)
            ),
          ]);

          return (apiResult as any).response.text();
        },
        {
          staleWhileRevalidate: true,
          staleTTL: ttl * 2,
        }
      );

      const duration = Date.now() - startTime;
      trackGeminiRequest('chat', duration, true);
      trackGeminiCache(result !== null);

      return result;
    } catch (error) {
      const duration = Date.now() - startTime;
      trackGeminiRequest('chat', duration, false);
      trackGeminiCache(false);

      logger.error('AI Chat failed:', error);
      throw new Error('فشل في الحصول على رد من الذكاء الاصطناعي');
    }
  }

  async getShotSuggestion(sceneDescription: string, shotType: string): Promise<any> {
    const startTime = Date.now();

    try {
      const prompt = `أنت خبير في التصوير السينمائي والإخراج. بناءً على المشهد التالي، اقترح تفاصيل اللقطة من نوع "${shotType}":

المشهد: ${sceneDescription}

قدم اقتراحاتك في النقاط التالية:
1. نوع اللقطة (Close-up, Medium Shot, Wide Shot، إلخ)
2. زاوية الكاميرا (Eye Level, High Angle, Low Angle، إلخ)
3. حركة الكاميرا (Static, Pan, Tilt, Dolly، إلخ)
4. الإضاءة المقترحة (Natural, Soft, Dramatic، إلخ)
5. المزاج العام للقطة
6. ملاحظات إخراجية إضافية

أرجع الإجابة بصيغة JSON بالشكل التالي:
{
  "shotType": "نوع اللقطة",
  "cameraAngle": "زاوية الكاميرا",
  "cameraMovement": "حركة الكاميرا",
  "lighting": "الإضاءة",
  "mood": "المزاج",
  "notes": "ملاحظات إضافية"
}`;

      // Generate cache key
      const cacheKey = generateGeminiCacheKey('shot-suggestion', { 
        sceneDescription, 
        shotType 
      });
      const ttl = getGeminiCacheTTL('shot-suggestion');

      const result = await cachedGeminiCall(
        cacheKey,
        ttl,
        async () => {
          // Add timeout
          const apiResult = await Promise.race([
            this.model.generateContent(prompt),
            new Promise((_, reject) =>
              setTimeout(() => reject(new Error('Gemini request timeout')), this.REQUEST_TIMEOUT)
            ),
          ]);

          const text = (apiResult as any).response.text();
          
          // Try to parse JSON from the response
          try {
            // Remove markdown code blocks if present
            const cleanText = text.replace(/```json\n?/g, '').replace(/```\n?/g, '').trim();
            return JSON.parse(cleanText);
          } catch {
            // If parsing fails, return structured response
            return {
              shotType: shotType,
              cameraAngle: 'Eye Level',
              cameraMovement: 'Static',
              lighting: 'Natural',
              mood: 'محايد',
              notes: text,
            };
          }
        },
        {
          staleWhileRevalidate: true,
          staleTTL: ttl * 2,
        }
      );

      const duration = Date.now() - startTime;
      trackGeminiRequest('shot-suggestion', duration, true);
      trackGeminiCache(result !== null);

      return result;
    } catch (error) {
      const duration = Date.now() - startTime;
      trackGeminiRequest('shot-suggestion', duration, false);
      trackGeminiCache(false);

      logger.error('Shot suggestion failed:', error);
      throw new Error('فشل في توليد اقتراحات اللقطة');
    }
  }

  private buildPrompt(text: string, analysisType: string): string {
    const prompts = {
      characters: `حلل الشخصيات في النص التالي واستخرج:
1. الشخصيات الرئيسية
2. العلاقات بينها
3. تطور كل شخصية

النص: ${text}`,
      
      themes: `حلل المواضيع والأفكار في النص التالي:
1. الموضوع الرئيسي
2. المواضيع الفرعية
3. الرسائل المضمنة

النص: ${text}`,
      
      structure: `حلل البنية الدرامية للنص التالي:
1. البداية والعقدة والحل
2. نقاط التحول
3. الإيقاع الدرامي

النص: ${text}`,
    };

    return prompts[analysisType as keyof typeof prompts] || prompts.characters;
  }
}

// Export singleton instance
export const geminiService = GeminiService.getInstance();