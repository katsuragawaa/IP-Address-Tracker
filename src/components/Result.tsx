type ResultProps = {
	title: string;
	content: string;
}

export function Result({ title, content }: ResultProps) {
  return (
    <div className="result-container">
      <div className="title">{title}</div>
      <div className="content">{content}</div>
    </div>
  );
}
