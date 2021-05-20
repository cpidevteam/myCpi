import React from 'react';
import Helmet from 'react-helmet';
import PropTypes from 'prop-types';

const Head = ({ frontmatter: { title, gtmId, intercomId, meta } }) => (
  <Helmet title={title}>
    {/* <span dangerouslySetInnerHTML={{ __html: head }} /> */}
    <meta name="description" content={meta.description} />
    <meta
      name="keywords"
      content={meta.keywords.length > 0 ? meta.keywords.join(',') : ''}
    />
    <meta property="og:image" content={meta.og.image} />
    <meta property="og:locale" content={meta.og.locale} />
    <meta property="og:type" content={meta.og.type} />
    <meta property="og:title" content={meta.og.title} />
    <meta property="og:description" content={meta.og.description} />
    <meta property="og:url" content={meta.og.url} />
    <meta property="og:site_name" content={meta.og.site_name} />
    <meta name="twitter:card" content={meta.twitter.card} />
    <meta name="twitter:title" content={meta.twitter.title} />
    <meta name="twitter:description" content={meta.twitter.description} />
    <link rel="canonical" href={meta.canonical} />
    <link rel="stylesheet" href="https://unpkg.com/react-vis/dist/style.css" />
    {gtmId && (
      <script>
        {`(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
      new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
      j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
      'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
      })(window,document,'script','dataLayer','${gtmId}');`}
      </script>
    )}
    {intercomId && (
      <script>
        {`var APP_ID = "${intercomId}";
    
        window.intercomSettings = {
            app_id: APP_ID
          };`}
      </script>
    )}
    {intercomId && (
      <script>
        {`(function(){var w=window;var ic=w.Intercom;if(typeof ic==="function")
      {ic('reattach_activator');ic('update',intercomSettings);}else{var d=document;
      var i=function(){i.c(arguments)};i.q=[];i.c=function(args){i.q.push(args)};
      w.Intercom=i;function l(){var s=d.createElement('script');s.type='text/javascript';
      s.async=true;s.src='https://widget.intercom.io/widget/${intercomId}';
      var x=d.getElementsByTagName('script')[0];x.parentNode.insertBefore(s,x);}
      if(w.attachEvent){w.attachEvent('onload',l);}else{w.addEventListener('load',l,false);}}})()`}
      </script>
    )}
  </Helmet>
);

Head.propTypes = {
  frontmatter: PropTypes.shape({
    title: PropTypes.string.isRequired,
    intercomId: PropTypes.string,
    gtmId: PropTypes.string,
    meta: PropTypes.any,
  }).isRequired,
};

export default Head;
