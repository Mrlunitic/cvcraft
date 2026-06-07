import ClassicTemplate from './ClassicTemplate';
import ModernTemplate from './ModernTemplate';
import CreativeTemplate from './CreativeTemplate';

export const TEMPLATES = [
  {
    id: 'classic',
    label: 'Classic',
    component: ClassicTemplate,
    colors: { primary: '#1e3a5f', accent: '#c5943a', bg: '#ffffff' }
  },
  {
    id: 'modern',
    label: 'Modern',
    component: ModernTemplate,
    colors: { primary: '#ffffff', accent: '#38bdf8', bg: '#1e3a5f' }
  },
  {
    id: 'creative',
    label: 'Creative',
    component: CreativeTemplate,
    colors: { primary: '#ffffff', accent: '#1e3a5f', bg: '#d4af37' }
  }
];

export const getTemplateComponent = (templateId) => {
  const template = TEMPLATES.find(t => t.id === templateId);
  return template ? template.component : ClassicTemplate; // Default to classic
};
