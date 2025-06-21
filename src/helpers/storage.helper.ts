export const changeNoticeAlertVisibility = (isVisible: boolean) =>
  localStorage.setItem('w-is_notice_alert_visible', isVisible.toString());

export const checkIsNoticeAlertVisible = () => {
  const value = localStorage.getItem('w-is_notice_alert_visible');

  return value === 'true' || !value;
};
