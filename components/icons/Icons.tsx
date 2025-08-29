
import React from 'react';

type IconProps = React.SVGProps<SVGSVGElement>;

export const TitansLogoIcon: React.FC<IconProps> = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <path d="M12 2L2 7l10 5 10-5-10-5z" />
    <path d="M2 17l10 5 10-5" />
    <path d="M2 12l10 5 10-5" />
  </svg>
);

export const OpenAIIcon: React.FC<IconProps> = (props) => (
  <svg viewBox="0 0 41 41" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
    <path d="M35.6,15.2c0,1.9-0.6,3.7-1.7,5.2c-1.1,1.5-2.6,2.6-4.4,3.2c-0.6,0.2-1.1,0.3-1.7,0.4c-1.5,0.2-3,0.2-4.5,0.1c-0.9,0-1.8-0.1-2.7-0.2c-2.1-0.3-4.1-1-5.9-2.1c-1.5-0.9-2.8-2.1-3.8-3.5c-0.9-1.4-1.5-3-1.7-4.7c-0.1-0.9-0.1-1.8-0.1-2.7c0.1-3,1-5.8,2.7-8.2c1.7-2.4,4.1-4.2,6.8-5.1c1.6-0.5,3.3-0.8,5-0.8c2.1,0,4.2,0.5,6.1,1.4c2.4,1.2,4.4,3,5.8,5.3c1,1.6,1.7,3.5,2,5.4C35.5,13.7,35.6,14.5,35.6,15.2z M20.5,40.1c-9.1,0-17.4-6.2-19.7-15.1c-0.5-1.9-0.7-3.8-0.7-5.8c0-1.9,0.2-3.8,0.7-5.7C2.9,5.2,10.1-0.2,18.4,0c9.4,0.2,17.4,6.5,19.6,15.5c0.5,2,0.8,4,0.8,6.1c0,2-0.2,4-0.7,5.9C35.7,35.1,28.6,40.1,20.5,40.1z" fill="currentColor"></path>
  </svg>
);

export const AnthropicIcon: React.FC<IconProps> = (props) => (
  <svg viewBox="0 0 256 256" xmlns="http://www.w3.org/2000/svg" {...props}>
    <path fill="currentColor" d="M211.31,192H44.69a16,16,0,0,1-13.8-24.06l83.31-144a16,16,0,0,1,27.62,0l83.31,144A16,16,0,0,1,211.31,192Zm-79.4-24h71.49L128,45.24,52.9,168h71.49Z"></path>
  </svg>
);

export const MicrosoftCopilotIcon: React.FC<IconProps> = (props) => (
  <svg viewBox="0 0 21 21" xmlns="http://www.w3.org/2000/svg" {...props}>
    <path fill="currentColor" d="M10.5 21C4.7 21 0 16.3 0 10.5S4.7 0 10.5 0C16.3 0 21 4.7 21 10.5S16.3 21 10.5 21zM10.5 1.5C5.5 1.5 1.5 5.5 1.5 10.5S5.5 19.5 10.5 19.5S19.5 15.5 19.5 10.5S15.5 1.5 10.5 1.5z"></path><path fill="currentColor" d="M10.5 15.5c-2.8 0-5-2.2-5-5s2.2-5 5-5c2.8 0 5 2.2 5 5S13.3 15.5 10.5 15.5zM10.5 7c-1.9 0-3.5 1.6-3.5 3.5S8.6 14 10.5 14s3.5-1.6 3.5-3.5S12.4 7 10.5 7z"></path><path fill="currentColor" d="M15.2 16H5.8c-.3 0-.5-.2-.5-.5s.2-.5.5-.5h9.3c.3 0 .5.2.5.5S15.5 16 15.2 16z"></path>
  </svg>
);

export const DeepSeekIcon: React.FC<IconProps> = (props) => (
   <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
    <path fillRule="evenodd" clipRule="evenodd" d="M15.5 4.5a3.5 3.5 0 100 7 3.5 3.5 0 000-7zM7.5 15a4.5 4.5 0 100 9 4.5 4.5 0 000-9zm10.038 2.05a.75.75 0 00-1.076 1.036 3.5 3.5 0 11-4.988 4.878.75.75 0 10-1.015 1.102A5.001 5.001 0 1020 18.5a.75.75 0 00-2.462-1.45z" fill="currentColor"></path>
  </svg>
);

export const LMStudioIcon: React.FC<IconProps> = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M14 9a2 2 0 0 1-2 2H6l-4 4V4c0-1.1.9-2 2-2h8a2 2 0 0 1 2 2v5Z"/>
      <path d="M18 9h2a2 2 0 0 1 2 2v11l-4-4h-6a2 2 0 0 1-2-2v-1"/>
    </svg>
);

export const ChatIcon: React.FC<IconProps> = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
  </svg>
);

export const SearchIcon: React.FC<IconProps> = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <circle cx="11" cy="11" r="8" />
    <line x1="21" y1="21" x2="16.65" y2="16.65" />
  </svg>
);

export const FolderIcon: React.FC<IconProps> = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z" />
  </svg>
);

export const LegalIcon: React.FC<IconProps> = (props) => (
    <svg 
        xmlns="http://www.w3.org/2000/svg" 
        width="24" 
        height="24" 
        viewBox="0 0 24 24" 
        fill="none" 
        stroke="currentColor" 
        strokeWidth="2" 
        strokeLinecap="round" 
        strokeLinejoin="round" 
        {...props}
    >
        <path d="M16 6l-4 4-4-4"></path>
        <path d="M8.5 10h7"></path>
        <path d="M12 2v8"></path>
        <path d="M5 12h14"></path>
        <path d="M6 12l-2 6h4l2-6"></path>
        <path d="M18 12l2 6h-4l-2-6"></path>
    </svg>
);

export const SettingsIcon: React.FC<IconProps> = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <circle cx="12" cy="12" r="3" />
    <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z" />
  </svg>
);

export const SendIcon: React.FC<IconProps> = (props) => (
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <line x1="22" y1="2" x2="11" y2="13" />
    <polygon points="22 2 15 22 11 13 2 9 22 2" />
  </svg>
);

export const UserIcon: React.FC<IconProps> = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
    <circle cx="12" cy="7" r="4" />
  </svg>
);

export const TeamIcon: React.FC<IconProps> = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
    <circle cx="9" cy="7" r="4"></circle>
    <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
    <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
  </svg>
);


export const CopyIcon: React.FC<IconProps> = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
    <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
  </svg>
);

export const CodeIcon: React.FC<IconProps> = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <polyline points="16 18 22 12 16 6" />
    <polyline points="8 6 2 12 8 18" />
  </svg>
);

export const ChevronDownIcon: React.FC<IconProps> = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <polyline points="6 9 12 15 18 9" />
  </svg>
);

export const FileIcon: React.FC<IconProps> = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <path d="M13 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9z"></path>
    <polyline points="13 2 13 9 20 9"></polyline>
  </svg>
);
