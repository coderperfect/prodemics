import { HttpClient } from '@angular/common/http';
import { Injectable, signal } from '@angular/core';

import { environment } from '../../environments/environment';

interface Notice {
  id: number,
  title: string,
  noticeDate: string,
  description: string
}

interface NoticesResponse {
  notices: Notice[],
  currentPage: number,
  totalPages: number
}

@Injectable({ providedIn: 'root' })
export class NoticeService {
  readonly noticeRefresh = signal(0);

  constructor(private httpClient: HttpClient) {}

  getNotices(pageNumber?: number) {
    if(!pageNumber)
      return this.httpClient.get<NoticesResponse>(`${environment.HOST_URL}/api/notices`);
    
    return this.httpClient.get<NoticesResponse>(
      `${environment.HOST_URL}/api/notices?pageNumber=${pageNumber}`
    );
  }

  getNotice(noticeId: number) {
    return this.httpClient.get<Notice>(`${environment.HOST_URL}/api/notices/${noticeId}`);
  }

  addNotice(title: string, noticeDate: string, description: string) {
    return this.httpClient.post<Notice>(
      `${environment.HOST_URL}/api/notices`, {title, noticeDate, description}
    );
  }

  updateNotice(noticeId: number, title: string, noticeDate: string, description: string) {
    return this.httpClient.put<Notice>(
      `${environment.HOST_URL}/api/notices/${noticeId}`, { title, noticeDate, description }
    );
  }

  deleteNotice(noticeId: number) {
    return this.httpClient.delete(
      `${environment.HOST_URL}/api/notices/${noticeId}`
    );
  }
}
