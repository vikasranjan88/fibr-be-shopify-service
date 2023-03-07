import { useAppBridge } from "@shopify/app-bridge-react";
import { Redirect } from "@shopify/app-bridge/actions";
import { Card, Layout, Link, Page } from "@shopify/polaris";
import { navigate } from "raviger";
import React, { useEffect, useState } from "react";
import useFetch from "../../hooks/useFetch";

const GetData = () => {
  const app = useAppBridge();
  const redirect = Redirect.create(app);
  const [responseData, setResponseData] = useState("");
  const [responseDataPost, setResponseDataPost] = useState("");
  const [responseDataGQL, setResponseDataGQL] = useState("");
  const fetch = useFetch();

  async function fetchContent() {
    setResponseDataGQL("Syncing Started...");
    const resdatads = await fetch("/api/store");
    const resdatas = await fetch("/api/collections");
    const resdata = await fetch("/api/product");
    const discdata = await fetch("/api/discountcode");
    const billingdata = await fetch("/api/billing");
    const { synctime } = await resdatads.json();
    setResponseDataGQL(synctime);
  }

  async function fetchContentPost() {
    setResponseDataPost("loading...");
    const postBody = JSON.stringify({ content: "Body of POST request" });
    const res = await fetch("/api", {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      method: "POST",
      body: postBody,
    }); //fetch instance of useFetch()

    const { content } = await res.json();
    
    setResponseDataPost(content);
  }

  async function fetchContentGQL() {
    const syncdata = await fetch("/api/syncdata");
    const data = await syncdata.json();
    if(!data.sync_status){
      setResponseDataGQL("Syncing Started");
      const resdatads = await fetch("/api/store");
      const resdatas = await fetch("/api/collections");
      const resdata = await fetch("/api/product");
      const discdata = await fetch("/api/discountcode");
      const billingdata = await fetch("/api/billing");
      const { synctime } = await resdatads.json();
      setResponseDataGQL(synctime);
    }
    else{
      setResponseDataGQL(data.synctime);
    }
  }

  useEffect(() => {
    // fetchContent();
    // fetchContentPost();
    fetchContentGQL();
  }, []);

  // return (
  //   <Page
  //     title="Dashboard"
      
  //   >
  //     <Layout>
  //       <Layout.Section>
  //         <Card
  //           sectioned
  //           // primaryFooterAction={{
  //           //   content: "Refetch",
  //           //   onAction: () => {
  //           //     fetchContent();
  //           //   },
  //           // }}
  //         >
  //           <p>
  //           Product and collection sync process : {responseDataGQL}
  //           </p>
  //         </Card>
  //       </Layout.Section>
  //     </Layout>
  //   </Page>
  // );
  return (
    <Page
      title="Dashboard"
    >
      <Layout>
        <Layout.Section>
          <Card
            sectioned
            primaryFooterAction={{
              content: "Sync Now",
              onAction: () => {
                fetchContent();
              },
            }}
          >
            <h4><b>Sync your online store</b></h4>
            <hr></hr>
            <p>
              Last synced at: {responseDataGQL}
            </p>
          </Card>
        </Layout.Section>
      </Layout>
    </Page>
  );
};

export default GetData;
