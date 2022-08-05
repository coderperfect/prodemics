import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { environment } from 'src/environments/environment';

interface Notice {
    title: string,
    description: string,
    createdAt: string
}

@Injectable({ providedIn: 'root' })
export class NoticeService {
  constructor(private httpClient: HttpClient) {}

  getNotice() {
    return this.httpClient.get<Notice[]>(`${environment.HOST_URL}/notice/list`);
  }
}
