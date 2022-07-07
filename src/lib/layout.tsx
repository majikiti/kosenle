import { ComponentChildren } from "preact"
import { Link } from "preact-router"
import "./layout.scss"

type LayoutProps = {
  children: ComponentChildren
}

export default function Layout(props: LayoutProps) {
  return (
    <>
      <header>
        <Link href='/' class='white'>
          Kosenle
        </Link>
        <Link href='/about' class='q'>
          ❓
        </Link>
      </header>
      <main>{props.children}</main>
      <footer>
        <span>&copy; 2022 マジキチ</span>
        <span>
          <a href='https://github.com/majikiti/kosenle' target='_blank'>
            <img src='/github.png' alt='github' width='16' height='16' /> src
          </a>
        </span>
      </footer>
    </>
  )
}
