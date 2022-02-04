import React from "react"
import { graphql } from "gatsby"

export default function Home({data}) {
  return <div>hi<pre>{JSON.stringify(data, null, 2)}</pre></div>
}

export function config() {
  return () => {
    return {
      defer: true
    }
  }
}

export const q = graphql`
  {
    jsdom
  }
`