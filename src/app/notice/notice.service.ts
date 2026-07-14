import { HttpClient } from '@angular/common/http';
import { Injectable, signal } from '@angular/core';

import { environment } from '../../environments/environment';

interface Notice {
    id: number,
    title: string,
    description: string,
    createdAt: string
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
      return this.httpClient.get<NoticesResponse>(`${environment.HOST_URL}/notice`);
    
    return this.httpClient.get<NoticesResponse>(
      `${environment.HOST_URL}/notice?pageNumber=${pageNumber}`
    );
  }

  getNotice(noticeId: number) {
    return this.httpClient.get<Notice>(`${environment.HOST_URL}/notice/${noticeId}`);
  }

  addNotice(title: string, description: string, createdAt: string) {
    return this.httpClient.post<Notice>(
      `${environment.HOST_URL}/notice`, {title, description, createdAt}
    );
  }
}
