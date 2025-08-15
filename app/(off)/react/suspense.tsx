import { Suspense } from "react";

async function TargetComponent() {
  await new Promise((resolve) => setTimeout(resolve, 2000)); // chờ 2 giây
  return <div className="rounded bg-green-100 p-4">✅ Data đã load xong!</div>;
}

function SkeletonComponent() {
  return <div className="rounded bg-gray-200 p-4">⏳ Đang tải...</div>;
}

export default function Example() {
  return (
    <>
      <Suspense fallback={<SkeletonComponent />}>
        <TargetComponent />
      </Suspense>
    </>
  );
}
