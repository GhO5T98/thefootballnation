import React from "react";
import { DiscussionEmbed } from "disqus-react";

const DisqusComments = () => {
  const disqusShortname = "thefootballnation"; // Replace with your Disqus shortname

  const disqusConfig = {
    url: window.location.href,
    identifier: "", // Unique identifier for the page (e.g., post ID)
    title: "", // Title of the page
  };

  return <DiscussionEmbed shortname={disqusShortname} config={disqusConfig} />;
};

export default DisqusComments;
