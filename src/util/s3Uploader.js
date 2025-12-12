import apiClient from '@/config/axiosConfig';

export async function uploadToS3(file) {
  // 1) 서버에서 presigned url 생성 요청
  const presignRes = await apiClient.get('/api/upload/presigned', {
    params: {
      fileName: file.name,
      contentType: file.type,
    },
  });

  const { uploadUrl, fileName } = presignRes.data;

  // 2) S3에 직접 PUT 업로드
  const putRes = await fetch(uploadUrl, {
    method: 'PUT',
    headers: { 'Content-Type': file.type },
    body: file,
  });

  if (!putRes.ok) {
    throw new Error('S3 업로드 실패');
  }

  // 3) 성공 후 fileUrl을 반환 → 클라이언트 렌더링 / 메시지 전송에 사용
  return {
    fileKey: fileName,
    fileName: file.name,
    fileSize: file.size,
  };
}
