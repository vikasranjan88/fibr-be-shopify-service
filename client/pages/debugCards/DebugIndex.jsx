import { useAppBridge } from "@shopify/app-bridge-react";
import { Card, Layout, Page } from "@shopify/polaris";
import { defaultFieldResolver } from "graphql";
import { navigate } from "raviger";
import React, { useState,useEffect } from "react";

const DebugIndex = () => {
  const app = useAppBridge();
  const [WebhooksOnOff,setWebhooksOnOff]=useState(true);
  useEffect(() => {
    if(localStorage.getItem('WebhooksOnOff')){
      var data = localStorage.getItem('WebhooksOnOff');
      if(data == 'Yes'){
        setWebhooksOnOff(true);
      }else if(data == 'No'){
        setWebhooksOnOff(false);
      }
    }
    },[localStorage.getItem('WebhooksOnOff')]);
  return (
    <Page
      title="Debug Cards"
      subtitle="Interact and explore the current installation"
      breadcrumbs={[{ content: "Home", onAction: () => navigate("/") }]}
    >
      <Layout>
        <Layout.Section oneHalf>
          <Card
            sectioned
            title="Webhooks"
          //   primaryFooterAction={{
          //      content: "Yes",
          //      onAction: () => {
          //        navigate("/debug/activeWebhooks");   
          //      },
          //    }
          //   }
          //   secondaryFooterActions={{
          //     content: "No",
          //     onAction: () => {
          //       navigate("/debug/activeWebhooks");   
          //     },
          //   }
          //  }
            primaryFooterAction={{
              content: WebhooksOnOff ? 'No' : 'Yes',
              onAction: () => {
                WebhooksOnOff?
                localStorage.setItem('WebhooksOnOff', 'No'):
                localStorage.setItem('WebhooksOnOff', 'Yes')
              },
            }}
          >
            <p>Explore registered webhooks and endpoints.</p>
            <p>Webhooks {localStorage.getItem('WebhooksOnOff')}</p>
          </Card>
        </Layout.Section>
        <Layout.Section oneHalf>
          <Card
            sectioned
            title="Data Fetching"
            primaryFooterAction={{
              content: "Explore",
              onAction: () => {
                navigate("/debug/getData");
              },
            }}
          >
            <p>
              Run GET and POST requests to your server along with GraphQL
              queries.
            </p>
          </Card>
        </Layout.Section>
        <Layout.Section oneHalf>
          <Card
            sectioned
            title="Billing API"
            primaryFooterAction={{
              content: "Cha-Ching",
              onAction: () => {
                navigate("/debug/billing");
              },
            }}
          >
            <p>Subscribe merchant to a plan and explore existing plans.</p>
          </Card>
        </Layout.Section>
        <Layout.Section oneHalf>
          <Card
            sectioned
            title="Dev Notes"
            primaryFooterAction={{
              content: "Let's go",
              onAction: () => {
                navigate("/debug/devNotes");
              },
            }}
          >
            <p>Notes for devs on expectations.</p>
          </Card>
        </Layout.Section>
      
      </Layout>
    </Page>
  );
};

export default DebugIndex;
