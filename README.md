# OFF – One‑File Feature Starter Pack

Mục tiêu: luyện tập theo kỹ thuật **mỗi tính năng = 1 file duy nhất**.
Bạn *không* cần dựng lại toàn bộ dự án. Chỉ cần:
1) Mỗi khi học/làm lại một tính năng, tạo **1 file OFF** mới dựa trên template.
2) Ưu tiên port những tính năng bạn hay gặp nhất (top 5 trước).
3) Khi vào production, tách file theo cấu trúc chuẩn sau — còn OFF vẫn giữ để ôn.

## Cấu trúc
- `html/` – OFF bằng file `.html` tự chạy
- `css/` – OFF về layout/utility, nhúng CSS ngay trong file
- `js/` – OFF JavaScript thuần, có test harness trong file
- `react/` – OFF React *một file component*, dùng trong môi trường Vite/CRA (hoặc CodeSandbox)
- `tailwind/` – OFF demo class & pattern, dùng CDN cho tiện luyện
- `nextjs/` – OFF Next.js *một trang duy nhất*, kèm hướng dẫn đặt file vào dự án Next

## Quy ước đặt tên
`<topic>/<feature-slug>.<ext>` — ví dụ: `js/fetch-cancel.html`, `react/use-debounce.tsx`

## Lộ trình gợi ý (14 ngày x 30–45’)
- Ngày 1–3: HTML (a11y, forms, dialog)
- Ngày 4–5: CSS layout (grid/flex), responsive patterns
- Ngày 6–8: JS (fetch + abort, debounce/throttle, storage)
- Ngày 9–11: React hooks & state patterns (debounce, reducer, forms)
- Ngày 12–13: Tailwind patterns (spacing, grid, dark mode)
- Ngày 14: Next.js page + data fetching (app router), 1 file duy nhất

> Mẹo: Mỗi OFF phải có **Trace Map**, **Tests** (nút bấm nhanh), và **Notes** (gotchas).
