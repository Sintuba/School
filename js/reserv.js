//予約フォーム↓


flatpickr("#checkin-date", {
  locale:ja,
  dateFormat: "Y-m-d", // 選択した日付のフォーマット
  minDate: "today",   // 過去の日付を選択不可にする
});
flatpickr("#checkout-date", {
  locale:ja,
  dateFormat: "Y-m-d", // 選択した日付のフォーマット
  minDate: "today"  // 過去の日付を選択不可にする
});
// 予約フォーム↑
