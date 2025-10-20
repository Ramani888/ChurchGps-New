import { apiPut } from '../../../api/ApiServices';
import { Api } from '../../../api/EndPoint';

export const uploadIntroVideo = async body => {
  await apiPut(Api.uploadIntroVideo, body);
};

// utils/formdata.js
export const buildFilePart = (uri, fallbackName = 'intro.mp4') => {
  if (!uri) return null;

  // Ensure the URI has the "file://" prefix for Android fetch/axios
  const normalized = uri.startsWith('file://') ? uri : `file://${uri}`;

  // Try to infer a name from path; fallback if not found
  const nameFromPath = normalized.split('/').pop() || fallbackName;

  // Infer mime from extension (simple map; extend if you need more)
  const ext = (nameFromPath.split('.').pop() || '').toLowerCase();
  const mimeMap = {
    mp4: 'video/mp4',
    mov: 'video/quicktime',
    m4v: 'video/x-m4v',
    webm: 'video/webm',
    '3gp': 'video/3gpp',
    '3g2': 'video/3gpp2',
  };
  const type = mimeMap[ext] || 'video/mp4'; // sensible default

  return { uri: normalized, name: nameFromPath, type };
};
