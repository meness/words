export const storeIsNoticeAlertVisible = (isVisible: boolean) =>
  localStorage.setItem('w-is_notice_alert_visible', isVisible.toString());

export const getIsNoticeAlertVisible = () => {
  const value = localStorage.getItem('w-is_notice_alert_visible');

  return value === 'true' || !value;
};
