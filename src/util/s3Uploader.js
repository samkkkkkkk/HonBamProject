import apiClient from '@/config/axiosConfig';
export async function getPresignedUrls(files, mediaPurpose) {
  const body = files.map((f) => ({
    fileName: f.name,
    contentType: f.type,
    mediaPurpose,
  }));

  const presignRes = await apiClient.post('/api/upload/presigned', body);
  return presignRes.data;
}

export async function uploadToS3(filesOrFile, mediaPurpose) {
  const files = Array.isArray(filesOrFile) ? filesOrFile : [filesOrFile];

  if (!mediaPurpose) {
    throw new Error('mediaPurpose가 필요합니다.');
  }

  const presignedList = await getPresignedUrls(files, mediaPurpose);

  // 요청/응답 개수 불일치 방어
  if (!Array.isArray(presignedList) || presignedList.length !== files.length) {
    throw new Error('presigned 응답 개수 불일치');
  }

  const results = await Promise.all(
    presignedList.map(async (p, idx) => {
      const file = files[idx];
      const contentType = file.type || 'application/octet-stream';

      const putRes = await fetch(p.uploadUrl, {
        method: 'PUT',
        headers: { 'Content-Type': contentType },
        body: file,
      });

      if (!putRes.ok) {
        throw new Error(`S3 업로드 실패: ${file.name} (${putRes.status})`);
      }

      return {
        fileKey: p.fileKey,
        fileName: file.name,
        fileSize: file.size,
        contentType,
        mediaPurpose,
      };
    })
  );

  return results;
}
