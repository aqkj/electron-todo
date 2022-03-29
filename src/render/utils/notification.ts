// 通知

interface INotificationParams {
  title?: string
  body?: string
}
/**
 * 显示通知
 */
export function showNotify(params: INotificationParams) {
  createNotification(params)
}
/**
 * 创建消息通知
 * @param {INotificationParams} params 参数
 */
export function createNotification(params: INotificationParams) {
  // ;(ServiceWorkerRegistration as any).showNotification()
  const notification = new Notification(params.title, {
    // 通知的正文文本, 将显示在标题或副标题下面
    body: params.body,
    // 通知一直保持有效
    requireInteraction: true,
    // false有声音，true没声音
    silent: false,
    // icon: './nm.jpg'
    // actions: [{
    //   title: '什么的',
    //   action: 'button'
    // }]
  })
  // notification.addEventListener('click', () => {
  //   console.log('点击通知')
  // })
}