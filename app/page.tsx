import { MatrixRain } from "@/components/MatrixRain";
import { portfolioContent } from "@/lib/portfolio-content";

function ExternalLink({
  label,
  url,
  className = "",
}: {
  label: string;
  url: string;
  className?: string;
}) {
  return (
    <a
      className={`text-link ${className}`.trim()}
      href={url}
      target="_blank"
      rel="noreferrer"
      aria-label={`${label} (opens in a new tab)`}
    >
      {label}
      <span aria-hidden="true">↗</span>
    </a>
  );
}

export default function Home() {
  const {
    identity,
    hero,
    projects,
    experience,
    capabilities,
    skillGroups,
    education,
    process,
    manifesto,
    contact,
  } = portfolioContent;

  return (
    <>
      <a className="skip-link" href="#main-content">
        Skip to content
      </a>

      <MatrixRain />
      <div className="ambient-overlay" aria-hidden="true" />

      <div className="page-shell">
        <header className="site-header">
          <div className="layout header-inner">
            <a className="brand" href="#top" aria-label="Back to the top">
              <span>{identity.firstName}</span>
              <span className="brand-mark" aria-hidden="true">
                /
              </span>
            </a>

            <nav className="site-nav" aria-label="Primary navigation">
              <a href="#work">Work</a>
              <a className="nav-wide" href="#experience">
                Experience
              </a>
              <a className="nav-wide" href="#skills">
                Skills
              </a>
              <a href="#contact">Contact</a>
            </nav>
          </div>
        </header>

        <main id="main-content">
          <section className="hero layout" id="top" aria-labelledby="hero-title">
            <div className="hero-topline">
              <p className="eyebrow">{hero.eyebrow}</p>
              <p className="availability">
                <span aria-hidden="true" /> {identity.availability}
              </p>
            </div>

            <h1 id="hero-title">
              {hero.headlineBefore} <span>{hero.headlineEmphasis}</span>{" "}
              {hero.headlineAfter}
            </h1>

            <div className="hero-bottom">
              <p className="hero-copy">{hero.intro}</p>
              <div className="hero-actions" aria-label="Hero actions">
                <ExternalLink
                  className="text-link--primary"
                  label="Connect on LinkedIn"
                  url={contact.linkedin.url}
                />
                <a className="text-link" href="#work">
                  Explore selected work <span aria-hidden="true">↓</span>
                </a>
              </div>
              <p className="hero-index" aria-hidden="true">
                00 — {identity.location}
              </p>
            </div>
          </section>

          <section
            className="section layout"
            id="work"
            aria-labelledby="work-title"
          >
            <div className="section-heading">
              <p className="section-kicker">01 / Selected work</p>
              <div>
                <h2 id="work-title">Products built end to end.</h2>
                <p className="section-lede">
                  Production-style applications spanning polished interfaces,
                  secure backends, persistent data, and real product workflows.
                </p>
              </div>
            </div>

            <div className="project-list">
              {projects.map((project, index) => (
                <article className="project-row" key={project.name}>
                  <p className="project-number">
                    {String(index + 1).padStart(2, "0")}
                  </p>
                  <div className="project-name">
                    <p className="concept-label">{project.type}</p>
                    <h3>{project.name}</h3>
                  </div>
                  <p className="project-description">{project.description}</p>
                  <div className="project-meta">
                    <p className="project-stack">
                      {project.stack.map((technology) => (
                        <span key={technology}>{technology}</span>
                      ))}
                    </p>
                    <div
                      className="project-actions"
                      aria-label={`${project.name} links`}
                    >
                      <a
                        href={project.sourceUrl}
                        target="_blank"
                        rel="noreferrer"
                        aria-label={`View ${project.name} source code (opens in a new tab)`}
                      >
                        View code <span aria-hidden="true">↗</span>
                      </a>
                      {project.liveUrl ? (
                        <a
                          href={project.liveUrl}
                          target="_blank"
                          rel="noreferrer"
                          aria-label={`Open ${project.name} live demo (opens in a new tab)`}
                        >
                          Live demo <span aria-hidden="true">↗</span>
                        </a>
                      ) : (
                        <span
                          className="project-action--disabled"
                          aria-disabled="true"
                          title="Live project link will be added after hosting."
                        >
                          Live demo · soon
                        </span>
                      )}
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </section>

          <section
            className="section layout"
            id="experience"
            aria-labelledby="experience-title"
          >
            <div className="section-heading section-heading--compact">
              <p className="section-kicker">02 / Experience</p>
              <h2 id="experience-title">Real work. Full ownership.</h2>
            </div>

            <article className="experience-row">
              <div className="experience-heading">
                <p>{experience.period}</p>
                <h3>{experience.role}</h3>
                <p>{experience.company}</p>
              </div>
              <div className="experience-detail">
                <p className="experience-stack">
                  {experience.technologies.join(" / ")}
                </p>
                <ul>
                  {experience.highlights.map((highlight) => (
                    <li key={highlight}>{highlight}</li>
                  ))}
                </ul>
              </div>
            </article>
          </section>

          <section
            className="section layout"
            id="capabilities"
            aria-labelledby="capabilities-title"
          >
            <div className="section-heading section-heading--compact">
              <p className="section-kicker">03 / Capabilities</p>
              <h2 id="capabilities-title">Frontend focus. Full-stack reach.</h2>
            </div>

            <div className="capability-list">
              {capabilities.map((capability, index) => (
                <article className="capability-row" key={capability.title}>
                  <p className="capability-number">
                    {String(index + 1).padStart(2, "0")}
                  </p>
                  <h3>{capability.title}</h3>
                  <p>{capability.description}</p>
                </article>
              ))}
            </div>
          </section>

          <section
            className="section layout"
            id="skills"
            aria-labelledby="skills-title"
          >
            <div className="section-heading section-heading--compact">
              <p className="section-kicker">04 / Technical skills</p>
              <h2 id="skills-title">Tools I use to ship.</h2>
            </div>

            <div className="skills-list">
              {skillGroups.map((group, index) => (
                <div className="skill-row" key={group.label}>
                  <p className="capability-number">
                    {String(index + 1).padStart(2, "0")}
                  </p>
                  <h3>{group.label}</h3>
                  <p>{group.skills.join(" · ")}</p>
                </div>
              ))}
            </div>
          </section>

          <section className="manifesto layout" aria-labelledby="manifesto-title">
            <p className="section-kicker">05 / Working principle</p>
            <h2 id="manifesto-title">{manifesto.headline}</h2>
            <p className="manifesto-copy">{manifesto.copy}</p>
          </section>

          <section
            className="section layout"
            id="education"
            aria-labelledby="education-title"
          >
            <div className="section-heading section-heading--compact">
              <p className="section-kicker">06 / Education</p>
              <h2 id="education-title">Built on strong foundations.</h2>
            </div>

            <div className="education-row">
              <p>{education.period}</p>
              <div>
                <h3>{education.degree}</h3>
                <p>{education.university}</p>
                <p>
                  {education.location} · {education.status}
                </p>
              </div>
            </div>
          </section>

          <section
            className="section layout"
            id="process"
            aria-labelledby="process-title"
          >
            <div className="section-heading section-heading--compact">
              <p className="section-kicker">07 / Process</p>
              <h2 id="process-title">From brief to working product.</h2>
            </div>

            <ol className="process-list">
              {process.map((step, index) => (
                <li key={step.title}>
                  <p className="process-number">
                    {String(index + 1).padStart(2, "0")}
                  </p>
                  <h3>{step.title}</h3>
                  <p>{step.description}</p>
                </li>
              ))}
            </ol>
          </section>

          <section
            className="contact layout"
            id="contact"
            aria-labelledby="contact-title"
          >
            <p className="section-kicker">08 / Get in touch</p>
            <h2 id="contact-title">
              Have something to build? <span>Let&apos;s talk.</span>
            </h2>
            <div className="contact-bottom">
              <p>
                {contact.location}
                <br />
                <a href={`mailto:${contact.email}`}>{contact.email}</a>
                <br />
                <a href={`tel:${contact.phone.replace(/\s/g, "")}`}>
                  {contact.phone}
                </a>
              </p>
              <div className="contact-actions">
                <ExternalLink
                  className="contact-link"
                  label={contact.linkedin.label}
                  url={contact.linkedin.url}
                />
                <ExternalLink
                  className="contact-link"
                  label={contact.github.label}
                  url={contact.github.url}
                />
              </div>
            </div>
          </section>
        </main>

        <footer className="site-footer layout">
          <p>© {new Date().getFullYear()} {identity.fullName}</p>
          <p>{identity.role} / {identity.location}</p>
          <a href="#top">Back to top ↑</a>
        </footer>
      </div>
    </>
  );
}
