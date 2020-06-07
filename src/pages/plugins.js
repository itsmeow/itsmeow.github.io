import React from "react"
import { Container } from "react-bootstrap"
import { CardList } from "../components/card"
import { useStaticQuery, graphql } from "gatsby"
import PebbleHost from "../components/pebblehost"
import Layout from "../components/layout"
import SEO from "../components/seo"
const Plugins = () => {
  const { allDataJson } = useStaticQuery(
    graphql`
      query {
        allDataJson {
          edges {
            node {
              plugins {
                data {
                  name
                  title
                  list {
                    spigoturl
                    role
                    name
                    info
                    title
                    thumbnail_local {
                      childImageSharp {
                        fluid {
                          src
                        }
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }
    `
  )
  const items = []
  allDataJson.edges.forEach(edge => {
    if (edge.node.plugins) {
      edge.node.plugins.data.forEach(data => {
        const items2 = []
        data.list.forEach(card => {
          const cardUrl =
            card.url || "https://www.spigotmc.org/resources/" + card.spigoturl
          items2.push(
            <div key={card.name} className="element" id={card.name}>
              <a
                className="element_link"
                rel="noopener noreferrer"
                target="_blank"
                href={cardUrl}
              >
                <img
                  className="element_img"
                  src={
                    card.thumbnail ||
                    card.thumbnail_local.childImageSharp.fluid.src
                  }
                  alt="Unable to get thumbnail"
                />
                <h5 className="element_text">{card.title}</h5>
                <div className="element_subtext_role">{card.role}</div>
                <div className="element_subtext_info">{card.info}</div>
              </a>
            </div>
          )
        })
        items.push(
          <section key={"section" + data.name}>
            <h2 key={"header" + data.name} align="center">
              {data.title}
            </h2>
            <CardList key={data.name} id={data.name}>
              {items2}
            </CardList>
          </section>
        )
      })
    }
  })

  return (
    <Layout pageInfo={{ pageName: "plugins" }}>
      <SEO title="Plugins" description="its_meow's plugin list and info" />
      <Container>
        <main>
          <noscript align="center">
            This page will not load properly without Javascript enabled.
          </noscript>
          <PebbleHost
            style={{
              width: "100%",
              maxWidth: "600px",
              marginTop: "20px",
              marginBottom: "20px",
            }}
            className="center-item-2 pebblebox"
          />
          {items}
        </main>
      </Container>
    </Layout>
  )
}

export default Plugins
