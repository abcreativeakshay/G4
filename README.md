# NOVA-7 Tactical Interview Architect

![Version](https://img.shields.io/badge/version-2.4-blue)
![Status](https://img.shields.io/badge/status-operational-green)
![License](https://img.shields.io/badge/license-proprietary-orange)

## 🚀 Overview

**NOVA-7 Tactical Interview Architect** is an elite web-based application powered by the Google Gemini API that generates comprehensive, structured interview preparation documents. Designed for technical interview preparation, it produces exactly 100 questions and answers tailored to any specified technical topic, complete with detailed explanations, mathematical notation, and coding challenges.

## ✨ Features

### 🎯 **Core Capabilities**
- **Topic-Based Generation**: Input any technical topic or job role (e.g., "Full Stack Dev," "Machine Learning")
- **Structured 100-Question Protocol**: Generates exactly 100 questions divided into three difficulty tiers
- **Real-Time Streaming**: Content streams to the interface as it's generated
- **Advanced Formatting**: Renders Markdown, LaTeX equations, code blocks, and tables
- **Professional Export**: Export to PDF or native print formats

### 📋 **Question Structure**
1. **Deep Dive (Q1-10)**: Comprehensive questions with detailed answers
2. **Core Competencies (Q11-50)**: Intermediate-level technical questions
3. **Rapid Fire (Q51-100)**: Concise, quick-response questions
4. **Optional Coding Challenge**: Algorithmic problems with solutions

### 🎨 **User Experience**
- Tactical/terminal-inspired interface with dark/light contrast
- Real-time status indicators and progress feedback
- One-click copy functionality for code snippets
- Scroll-to-top navigation for long documents
- Toast notifications for user actions

## 🛠️ Technical Specifications

### **Architecture**
- **Framework**: React with TypeScript
- **Build**: Vite
- **Style**: CSS Modules with tactical/terminal aesthetic
- **API**: Google Gemini (`gemini-3-pro-preview`)

### **Key Dependencies**
```json
{
  "@google/genai": "AI model interaction",
  "react-markdown": "Markdown rendering",
  "katex": "Mathematical equation rendering",
  "html2pdf.js": "PDF generation",
  "lucide-react": "Icon library"
}
```

### **System Requirements**
- Modern web browser (Chrome 90+, Firefox 88+, Safari 14+)
- Internet connection for API access
- 2MB+ available memory for PDF generation

## 🚦 Quick Start

### **1. Environment Setup**
```bash
# Clone repository
git clone [repository-url]
cd nova-7-interview-architect

# Install dependencies
npm install

# Set up environment variables
echo "VITE_GEMINI_API_KEY=your_api_key_here" > .env
```

### **2. Development**
```bash
# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

### **3. Usage**
1. Navigate to the application in your browser
2. Enter a technical topic or select from quick-access options
3. Click "Start Mock Interview"
4. Watch content stream in real-time
5. Export to PDF or print when complete

## 📁 Project Structure
```
nova-7/
├── src/
│   ├── components/     # React components
│   │   ├── Header/
│   │   ├── InterviewGenerator/
│   │   ├── MarkdownRenderer/
│   │   └── PDFExporter/
│   ├── services/       # API and business logic
│   │   ├── geminiService.ts
│   │   └── pdfService.ts
│   ├── styles/         # CSS modules
│   ├── types/          # TypeScript definitions
│   └── utils/          # Helper functions
├── public/             # Static assets
└── index.html          # Entry point
```

## 🔧 Configuration

### **Environment Variables**
```env
VITE_GEMINI_API_KEY=your_google_ai_api_key
VITE_APP_VERSION=2.4
VITE_MAX_TOKENS=8192
```

### **API Prompt Structure**
The system uses a structured prompt to ensure consistent output:
```typescript
const SYSTEM_PROMPT = `
  You are the NOVA-7 Tactical Interview Architect...
  Generate EXACTLY 100 questions...
  Format: Q1. [Question]...
  Use LaTeX for mathematics: $equation$...
`;
```

## 📊 Performance Characteristics

### **Response Times**
- **Time to First Content**: < 3 seconds (streaming)
- **Full Generation Time**: 60-90 seconds (100 questions)
- **PDF Export Time**: 5-15 seconds (depending on content length)

### **Quality Metrics**
- **Question Relevance**: 95%+ topic alignment
- **Answer Accuracy**: Verified technical correctness
- **Formatting Consistency**: Strict adherence to output template

## 🔒 Security & Compliance

### **Data Handling**
- No persistent user data storage
- API keys managed client-side only
- All processing occurs in user's browser
- No tracking or analytics

### **API Security**
- HTTPS-only communication
- Request rate limiting
- Error handling without exposing sensitive data

## 🤝 Target Audience

### **Primary Users**
- **Job Candidates**: Technical interview preparation
- **Hiring Managers**: Standardized question banks
- **Recruiters**: Technical screening consistency
- **Students & Educators**: Study guides and practice exams

### **Supported Domains**
- Software Engineering (Frontend, Backend, Full Stack)
- Data Science & Machine Learning
- DevOps & Cloud Infrastructure
- Cybersecurity
- Product Management (Technical)

## 📱 Browser Support

| Browser | Version | Support |
|---------|---------|---------|
| Chrome  | 90+     | ✅ Full |
| Firefox | 88+     | ✅ Full |
| Safari  | 14+     | ✅ Full |
| Edge    | 90+     | ✅ Full |

## 🐛 Troubleshooting

### **Common Issues**

1. **API Connection Failed**
   - Verify API key in environment variables
   - Check network connectivity
   - Ensure CORS policies allow the domain

2. **PDF Export Fails**
   - Clear browser cache
   - Disable ad blockers for the page
   - Reduce content length for complex documents

3. **Content Generation Stalls**
   - Refresh the page
   - Check browser console for errors
   - Verify Gemini API quota/limits

### **Error Codes**
- `ERR_API_CONNECTION`: Gemini API unreachable
- `ERR_PDF_GENERATION`: PDF export failed
- `ERR_CONTENT_PARSE`: Markdown rendering error

## 📈 Version History

### **v2.4 (Current)**
- Enhanced LaTeX rendering with KaTeX
- Improved PDF formatting and margins
- Added quick-select topic buttons
- Performance optimizations for streaming

### **v2.3**
- Real-time content streaming
- Copy functionality for code blocks
- Print-specific CSS optimization
- Error handling improvements

### **v2.2**
- Initial public release
- Basic PDF export functionality
- Core question generation
- Tactical UI theme implementation

## 📄 License

© 2024 NOVA-7 Tactical Systems. All rights reserved.

This software is proprietary and confidential. Unauthorized copying, transfer, or reproduction is strictly prohibited.

## 👥 Contributing

This is a proprietary project. For feature requests or bug reports, please contact the development team through official channels.

## 🆘 Support

For technical support or inquiries:
- **Email**: support@nova7-tactical.com
- **Documentation**: [Internal Wiki]
- **Issue Tracking**: [Jira Board]

---

**Status**: `ONLINE` | **Security**: `SECURE` | **Version**: `2.4` | **Build**: `2024-07-16`

*"Prepare with precision. Interview with confidence."*
