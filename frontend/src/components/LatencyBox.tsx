interface Props {
  latency: number | null;
  source: string;
}

export default function LatencyBox({ latency, source }: Props) {
  if (latency === null) return null;

  return (
    <div style={{ marginTop: 10, fontSize: 18 }}>
      <strong>Latency:</strong> {latency} ms | <strong>Source:</strong> {source}
    </div>
  );
}
