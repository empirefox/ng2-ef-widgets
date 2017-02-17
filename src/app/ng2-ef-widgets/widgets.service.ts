import { Injectable, Inject, OpaqueToken } from '@angular/core';

export const WIDGETS_QINIU_CONFIG_NAME = new OpaqueToken('widgetsQiniuConfigName');
export const WIDGETS_QINIU_PREFIX = new OpaqueToken('widgetsQiniuPrefix');

@Injectable()
export class WidgetsService {

  constructor(
    @Inject(WIDGETS_QINIU_CONFIG_NAME) public qiniuConfigName: string,
    @Inject(WIDGETS_QINIU_PREFIX) public qiniuPrefix: string) { }

}
