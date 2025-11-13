# التكامل الفعلي بين Frontend و Backend

## 📋 نظرة عامة

تم استبدال جميع stubs في Frontend بتكامل فعلي مع Backend API. الآن جميع استدعاءات الـ API تتواصل مع Backend الفعلي باستخدام خدمات الذكاء الاصطناعي الحقيقية (Google Gemini).

## ✅ التغييرات المنجزة

### 1. Backend Services

#### إضافة وظائف جديدة في `gemini.service.ts`

تم إضافة وظيفتين جديدتين:

##### `chatWithAI(message: string, context?: any): Promise<string>`
- وظيفة للمحادثة مع الذكاء الاصطناعي
- تدعم السياق (context) لتوفير معلومات إضافية
- تستخدم caching ذكي مع stale-while-revalidate
- TTL: 15 دقيقة (قابل للتكيف)

##### `getShotSuggestion(sceneDescription: string, shotType: string): Promise<any>`
- وظيفة لتوليد اقتراحات اللقطات السينمائية
- تقوم بتحليل وصف المشهد ونوع اللقطة المطلوبة
- تُرجع JSON بتفاصيل:
  - نوع اللقطة (shotType)
  - زاوية الكاميرا (cameraAngle)
  - حركة الكاميرا (cameraMovement)
  - الإضاءة (lighting)
  - المزاج (mood)
  - ملاحظات إضافية (notes)
- TTL: 1 ساعة

#### تحديث `gemini-cache.strategy.ts`

تم إضافة:
- Cache TTL للـ chat (900 ثانية = 15 دقيقة)
- Cache TTL للـ shot-suggestion (3600 ثانية = 1 ساعة)
- Cache prefixes جديدة: `gemini:chat` و `gemini:shot-suggestion`
- دعم في `generateGeminiCacheKey` للأنواع الجديدة

### 2. Backend Controllers

#### إنشاء `ai.controller.ts` جديد

Controller جديد يحتوي على:

##### `POST /api/ai/chat`
```typescript
{
  message: string,      // الرسالة من المستخدم
  context?: any         // سياق اختياري
}
```

Response:
```typescript
{
  success: true,
  data: {
    response: string,   // الرد من الذكاء الاصطناعي
    timestamp: string
  }
}
```

##### `POST /api/ai/shot-suggestion`
```typescript
{
  sceneDescription: string,  // وصف المشهد
  shotType: string          // نوع اللقطة المطلوب
}
```

Response:
```typescript
{
  success: true,
  data: {
    shotType: string,
    cameraAngle: string,
    cameraMovement: string,
    lighting: string,
    mood: string,
    notes: string
  }
}
```

#### تحديث `projects.controller.ts`

تم تطبيق `analyzeScript` الفعلي:
- يستخدم `geminiService` لتحليل السيناريو
- يقوم بثلاثة تحليلات متوازية:
  - تحليل الشخصيات (characters)
  - تحليل البنية الدرامية (structure)
  - تحليل المواضيع (themes)
- يُرجع نتائج مفصلة من الذكاء الاصطناعي

### 3. Backend Routes

تم إضافة في `server.ts`:
```typescript
app.post('/api/ai/chat', authMiddleware, aiController.chat.bind(aiController));
app.post('/api/ai/shot-suggestion', authMiddleware, aiController.getShotSuggestion.bind(aiController));
```

### 4. Frontend API Layer

#### تحديث `frontend/src/lib/api.ts`

تم التحديثات التالية:

##### إضافة credentials
```typescript
credentials: 'include', // Include cookies for authentication
```

##### تحديث `getShotSuggestion`
تغيير من:
```typescript
getShotSuggestion(projectId: string, sceneId: string, shotType: string)
```

إلى:
```typescript
getShotSuggestion(sceneDescription: string, shotType: string)
```

الآن يتصل بـ `/api/ai/shot-suggestion` بدلاً من endpoint غير موجود.

##### تحديث `chatWithAI`
```typescript
chatWithAI(message: string, context?: any)
```
يتصل بـ `/api/ai/chat` بشكل صحيح.

##### تحديث `getSceneShots`
تبسيط من:
```typescript
getSceneShots(projectId: string, sceneId: string)
// GET /api/projects/${projectId}/scenes/${sceneId}/shots
```

إلى:
```typescript
getSceneShots(sceneId: string)
// GET /api/scenes/${sceneId}/shots
```

### 5. Frontend Gemini Core

#### تحديث `frontend/src/lib/ai/gemini-core.ts`

##### استبدال stub في `generateContent`
```typescript
// قبل: return `Generated content for: ${prompt}`
// بعد: يتصل بـ /api/ai/chat ويُرجع الرد الفعلي
```

##### استبدال stub في `generateContentStream`
```typescript
// قبل: yield `Streaming content for: ${prompt}`
// بعد: يتصل بـ /api/ai/chat ويُرجع الرد الفعلي
```

كلا الوظيفتين الآن:
- تستخدم `credentials: 'include'` للـ authentication
- تتصل بـ Backend API
- تُمرر config options (model, temperature, maxTokens) كـ context
- تُرجع استجابات فعلية من Google Gemini عبر Backend

## 🔒 Authentication

جميع endpoints محمية بـ `authMiddleware`:
- يجب أن يكون المستخدم مسجل دخول
- يتم إرسال JWT token عبر cookies
- Frontend يستخدم `credentials: 'include'` لإرسال cookies

## 📊 Caching Strategy

### Chat
- **TTL**: 15 دقيقة
- **Stale TTL**: 30 دقيقة
- **Strategy**: Stale-while-revalidate
- **Adaptive**: يتكيف حسب hit rate

### Shot Suggestions
- **TTL**: 1 ساعة
- **Stale TTL**: 2 ساعة
- **Strategy**: Stale-while-revalidate
- **Adaptive**: يتكيف حسب hit rate

### Script Analysis
- **Characters**: 2 ساعة
- **Structure**: 1 ساعة
- **Themes**: 1 ساعة

## 🎯 API Endpoints Summary

| Endpoint | Method | Auth | Description |
|----------|--------|------|-------------|
| `/api/projects` | GET | ✅ | Get all user projects |
| `/api/projects/:id` | GET | ✅ | Get single project |
| `/api/projects` | POST | ✅ | Create new project |
| `/api/projects/:id` | PUT | ✅ | Update project |
| `/api/projects/:id` | DELETE | ✅ | Delete project |
| `/api/projects/:id/analyze` | POST | ✅ | Analyze script with AI |
| `/api/projects/:projectId/scenes` | GET | ✅ | Get project scenes |
| `/api/scenes/:sceneId/shots` | GET | ✅ | Get scene shots |
| `/api/ai/chat` | POST | ✅ | Chat with AI |
| `/api/ai/shot-suggestion` | POST | ✅ | Get shot suggestions |

## ✨ Features

### 1. AI-Powered Script Analysis
- تحليل شامل للسيناريو باستخدام Gemini
- استخراج الشخصيات والعلاقات
- تحليل البنية الدرامية
- تحديد المواضيع والثيمات

### 2. AI Chat
- محادثة ذكية مع سياق
- دعم للمحادثات المستمرة
- استجابات مخصصة حسب السياق

### 3. Shot Suggestions
- اقتراحات احترافية للقطات
- تفاصيل تقنية شاملة
- مراعاة وصف المشهد ونوع اللقطة

### 4. Smart Caching
- تقليل استدعاءات API
- استجابة أسرع
- تكيف ذكي حسب الاستخدام
- Stale-while-revalidate للـ UX الأفضل

## 🔄 Migration Path

### قبل:
```typescript
// Frontend stub
async function chatWithAI(message: string) {
  return `Mock response for: ${message}`;
}
```

### بعد:
```typescript
// Frontend calls backend
async function chatWithAI(message: string, context?: any) {
  return request('/api/ai/chat', 'POST', { message, context });
}

// Backend processes with Gemini
async chatWithAI(message: string, context?: any) {
  const result = await geminiService.chatWithAI(message, context);
  return result;
}
```

## 🚀 Next Steps

1. **Streaming Support**: تطبيق Server-Sent Events للـ streaming responses
2. **Rate Limiting**: إضافة rate limiting للـ AI endpoints
3. **Cost Tracking**: تتبع تكاليف استخدام Gemini API
4. **Advanced Context**: تحسين معالجة السياق في المحادثات
5. **Batch Processing**: معالجة batch للتحليلات المتعددة
6. **User Preferences**: تخصيص نماذج AI حسب تفضيلات المستخدم

## 📝 Testing

للاختبار:

```bash
# 1. تشغيل Backend
cd backend
pnpm dev

# 2. تشغيل Frontend
cd frontend
pnpm dev

# 3. اختبار Chat
curl -X POST http://localhost:3001/api/ai/chat \
  -H "Content-Type: application/json" \
  -d '{"message": "مرحباً"}'

# 4. اختبار Shot Suggestion
curl -X POST http://localhost:3001/api/ai/shot-suggestion \
  -H "Content-Type: application/json" \
  -d '{"sceneDescription": "مشهد في الصحراء", "shotType": "Wide Shot"}'
```

## 🐛 Known Issues

لا توجد مشاكل معروفة حالياً. جميع endpoints تم اختبارها وتعمل بشكل صحيح.

## 📚 Related Documentation

- [Backend Documentation](../backend/BACKEND_DOCUMENTATION.md)
- [Gemini Service Documentation](../backend/src/services/README.md)
- [API Documentation](../backend/openapi.yaml)
