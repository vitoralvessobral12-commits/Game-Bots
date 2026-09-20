export default function PageHeader({ eyebrow, title, description }) {
  return (
    <section className="page-header">
      {eyebrow && <span className="eyebrow">{eyebrow}</span>}
      <h1>{title}</h1>
      {description && <p>{description}</p>}
    </section>
  )
}
