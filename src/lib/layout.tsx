import { ComponentChildren } from "preact"
import "./layout.scss"

type LayoutProps = {
  children: ComponentChildren
}

export default function Layout(props: LayoutProps) {
  return (
    <>
      <header>Kosenle</header>
      <main>{props.children}</main>
      {/*<footer>&copy; 2022 Majikiti</footer>*/}
    </>
  )
}
