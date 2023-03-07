import { useAppBridge } from "@shopify/app-bridge-react";
import { Redirect } from "@shopify/app-bridge/actions";
import { Card, Layout, Page } from "@shopify/polaris";
import { navigate } from "raviger";
import React from "react";

const HomePage = () => {
  const app = useAppBridge();
  const redirect = Redirect.create(app);
  navigate("/debug/getData");
  return (
    <Page title="Home">
      <Layout>
        <Layout.Section fullWidth>
          <Card
            title="Debug Cards"
            sectioned
            primaryFooterAction={{
              content: "Debug Cards",
              onAction: () => {
                navigate("/debug");
              },
            }}
          >
            <p>
              Explore how the repository handles data fetching from the backend,
              App Proxy, making GraphQL requests, Billing API and more.
            </p>
          </Card>
        </Layout.Section>

        <Layout.Section oneHalf>
          <Card
            sectioned
            title="Documentation"
            primaryFooterAction={{
              content: "Explore APIs",
              onAction: () => {
                redirect.dispatch(Redirect.Action.REMOTE, {
                  url: "https://shopify.dev/graphiql/admin-graphiql",
                  newContext: true,
                });
              },
            }}
            secondaryFooterActions={[
              {
                content: "Design Guidelines",
                onAction: () => {
                  redirect.dispatch(Redirect.Action.REMOTE, {
                    url: "https://shopify.dev/apps/design-guidelines",
                    newContext: true,
                  });
                },
              },
            ]}
          >
            <p>
              Explore the GraphQL APIs in Graphiql or read design guidelines.
            </p>
          </Card>
        </Layout.Section>
        <Layout.Section fullWidth>
          <Card
            sectioned
            title="Developer Notes"
            primaryFooterAction={{
              content: "Read More",
              onAction: () => {
                navigate("/debug/devNotes");
              },
            }}
          >
            <p>
              Read notes on opening an issue, creating App Extensions and more.
            </p>
          </Card>
        </Layout.Section>
      </Layout>
    </Page>
  );

};

export default HomePage;
