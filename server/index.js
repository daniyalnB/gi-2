const express = require("express");
const compression = require("compression");
const path = require("path");
const fs = require("fs");
const app = express();
const appConfig = require("./appConfig.json");
const routeData = require("./data.json");
const axios = require("axios");
const baseURL = `${appConfig["localhost"]}:${appConfig.serverPort}`;

const PORT = process.env.PORT || 3000;
app.use(compression());

app.get(
  [
    "/resources/price-list-update-summary/january-2020/",
    "/resources/price-list-update-summary/january-2020",
    "/resources/price-list-update-summary/january-2020/",
  ],
  function (req, res) {
    res.redirect(
      301,
      "/resources/price-list-update-summary/price-list-update-summary-january-2020"
    );
  }
);

app.get(
  [
    "/resources/gift-cards",
    "/event/Actionable-Xactimate-Profile-and-Xact-Best-Practices-Bootcamp-jun27",
    "/event/Actionable-Xactimate-Profile-and-Xact-Best-Practices-Bootcamp-jun29",
    "/s=project20management",
    "/s=thermal20dbk",
    "/event/actionable-xactimate-profile-and-xact-best-practices-b0otcamp-aug29",
    "/event/xactimate-level-1-training-san-diego-ca-jul-2019",
    "/aimc-graduates-public-",
    "/insight-sheets/tag/fiberglass-tub/?post_type=insight_sheets",
    "/resources/price-",
    "/online-",
    "/actionable-xactimate-profile/FAQ",
    "/s=refridgerator",
    "/s=refridgerator",
    "/event/Actionable-Xactimate-Profile-Virtual-Onboarding-jan-01",
    "/video-gallery/monday-minute-by-stone-violation-alert",
    "/event/Actionable-Xactimate-Profile-and-Xact-Best-Practices-Bootcamp-march28",
    "/shop/form/solidifai",
    "/s=project management",
    "/event/xactimate-digital-assets-July19-21",
    "/s=drysmart20lp250",
    "/resources/price-",
    "/event/Xact-Mobile-wLiDar-San-Diego-CA-March-31",
    "/aitc",
    "/event/private-training-engagement-Sept-12-14-Sept",
    "/insight-sheets/tag/piano-packoutpackback/?post_type=insight_sheets",
    "/resources/insighter-report/cleaning-dirty-secret",
    "/event/xactimate-digital-assets-sep20/",
    "/resources/insighter-report/xactimate-white-paper-re-op-Test",
    "/aimc-ce",
    "/event/Actionable-Xactimate-Profile-Virtual-Onboarding-June-6",
    "/event/Actionable-Xactimate-Profile-and-Xact-Best-Practices-Bootcamp-dec21",
    "/event/private-training-engagement-Sept-5",
    "/actionable-",
    "/event/private-training-engagement-May-23-26-May",
    "/video-",
    "/resources/price-list-update",
    "/wp-content/plugins/video-embed-thumbnail-generator/video-js/video-js.css?ver=5.20.2",
    "/wp-content/plugins/wp-video-lightbox/js/video-lightbox.js?ver=3.1.6",
    "/wp-content/plugins/elfsight-youtube-gallery-cc/assets/elfsight-youtube-gallery.js?ver=3.0.0",
    "/wp-content/plugins/video-embed-thumbnail-generator/css/kgvid_styles.css?ver=4.6.20",
    "/advance-the-cause/",
    "/video-gallery/Matter-Hacks-Matterport-Tripod-Setup",
    "/wp-content/themes/onepress-child/style.css?ver=4.7.4",
    "/resources/insighter-",
    "/wp-content/plugins/wp-video-lightbox/css/prettyPhoto.css?ver=4.7.4",
    "/wp-content/plugins/ajax-search-pro/js/nomin-scoped/jquery.gestures.js?ver=dTJyFs",
    "/wp-content/plugins/video-embed-thumbnail-generator/video-js/kg-video-js-skin.css?ver=4.6.20",
    "/s=",
    "/wp-admin/admin-ajax.php",
    "/aimc-ce/",
    "/s=invoicing20for20matterport",
    "/resources/insighter-report/cleaning-dirty-secret/",
    "/video-gallery/xact-hacks-integrating-tokens-microsoft-office//1000",
    "/video-gallery/Matter-Hacks-Insta360-One-X2-Unboxing",
    "/resources/price-list-update-",
    "/event/Actionable-",
    "/insight-sheets/water-heater-dr-w-code-upgrades//1000",
    "/insight-sheets/oven-detach-reset//1000",
    "/s=masts",
    "/sitemap/",
    "/s=attic20vent",
    "/insight-sheets/infratech-ir-lamp",
    "/wp-json/tribe/events/v1/",
    "/wp-json/",
    "/video-gallery/xact-hacks-importing-macro//1000",
    "/s=gas20range20detach20&20reset",
    "/video-gallery/xact-hacks-code-upgrades//1000",
    "/resources/insighter-report/xactimate-white-paper-re-op//1000",
    "/video-gallery/xact-hacks-creating-custom-material-line-item//1000",
    "/solidifai/",
    "/video-gallery/Matter-Hacks-Matterport-Axis-Unboxing",
    "/insight-sheets/fence-remove-replace//1000",
    "/insight-sheets/ppes-cat-3//1000",
    "/video-gallery/xact-hacks-magic-photos//1000",
    "/insight-sheets/dryer-detach-reset//1000",
    "/event/xactimate-level-1-training-san-diego-ca-dec-2019//1000",
    "/video-gallery/xact-hacks-exterior-variables//1000",
    "/video-gallery/xact-hacks-live-chat-support//1000",
    "/video-gallery/xact-hacks-change-operator-name//1000",
    "/video-gallery/price-list-update-summary-august-2021//1000",
    "/my-account/downloads/",
    "/insight-sheets/tucked-carpet-onbelow-stairs//1000",
    "/s=attic20vent",
    "/aitc/",
    "/video-gallery/xact-hacks-reset-default-views//1000",
    "/video-gallery/xact-hacks-import-underlay-image//1000",
    "/video-gallery/academy-insights-aitc-solidifai-estimate-edit-engine/",
    "/img_crop_to_file.php",
    "/shop/membership-plans/plus-plan/",
    "/insight-sheet-request/",
    "/event/private-training-engagement-Aug-16-18",
    "/insight-sheets/roofing-3-tab-shingles//1000",
    "/resources/insighter-report/xactware-labor-efficiencies-design//1000",
    "/has_already_rated.php",
    "/tag/shower-base/?post_type=insight_sheets",
    "/video-gallery/xact-hacks-import-export-duplicate//1000",
    "/macros/1000",
    "/votes_value.php",
    "/video-gallery/xact-hacks-valuation-tool//1000",
    "/tag/waterproof/?post_type=insight_sheets",
    "/tag/caulking/?post_type=insight_sheets",
    "/tag/faucet/?post_type=insight_sheets",
    "/tag/drain/?post_type=insight_sheets",
    "/insight-sheets/supervisorproject-management-hours-residential//1000",
    "/solidifai",
    "/insight-sheets/gms-power-dist//1000",
    "/video-gallery/xact-hacks-online-sketch-gallery//1000",
    "/video-gallery/xact-hacks-frequently-used-line-items//1000",
    "/edit_reply.php",
    "/insight-sheets/cabinet-retrofit//1000",
    "/video-gallery/actionable-insights-xactimate-macros//1000",
    "/event/xactimate-level-2-training-san-diego//1000",
    "/video-gallery/xact-hacks-vertex-shifting//1000",
    "/video-gallery/xact-hacks-recycle-bin//1000",
    "/commonly-overlooked-line-items/1000",
    "/video-gallery/xact-hacks-distribute-market-conditions//1000",
    "/terms-and-conditions//1000",
    "/insight-sheets//1000",
    "/state-insurance-license-reciprocity/1000",
    "/resources/insighter-report/xactimate-history-future//1000",
    "/video-gallery/xact-hacks-editing-project-name-x1//1000",
    "/tag/shower/?post_type=insight_sheets",
    "/online-sketch-gallery/1000",
    "/s=dryout",
    "/resources/price-list-",
    "/video-gallery/xact-hacks",
    "/shop/form/solidifai",
    "/insight-sheets/tag/drysmart-lp250/?post_type=insight_sheets",
    "/private-",
    "/s=masts",
    "/category/mitigation/?post_type=insight_sheets",
    "/insight-sheets/tag/detach-reset/?post_type=insight_sheets",
    "/gift-cards/3d-training-modules/",
    "/s=dryout",
    "/add_call.php",
    "/zora-solidifai",
    "/delete_reply.php",
    "/event/Actionable-Xactimate-Profile-Virtual-Onboarding-feb-05",
    "/actionable-xactimate-profile/FAQ",
    "/insight-sheets/tag/refridgerator/?post_type=insight_sheets",
    "/video-gallery/Matter-Hacks-Trim-Tool",
    "/insight-sheets/tag/appliance/?post_type=insight_sheets",
    "/rate.php",
    "/insighter-report/",
    "/search/calcium-chloride/",
    "/wp-content/plugins/wp-video-lightbox",
    "/sponsor-a-student/3d-training-modules/",
    "/sponsor-a-student/",
    "/tag/fiberglass/?post_type=insight_sheets",
    "/event/Actionable-Xactimate-Profile-and-Xact-Best-Practices-Bootcamp-march28",
    "/plan-",
    "/https://youtu.be/fY19pCGGwqE/",
    "/insight-sheets/tag/garbage-disposal/?post_type=insight_sheets",
    "/event/xactimate-digital-assets-Dec6-8",
    "/img_save_to_file.php",
    "/peer-review/",
    "/actionable-insights-socks/",
    "/xS",
    "/static/4e8d99ab6b7067d9922e.webp",
    "/zora/",
    "/feed/",
    "/static/b473caf83e7e9a5f2550.webp",
    "/static/3bb472425716e8826593.webp",
    "/xactimate-history-",
    "/actionable-xactimate-",
    "/advance-the-",
    "/comments/feed/",
    "/wp-content/plugins/wp-video-lightbox",
    "/meta",
  ],
  function (req, res) {
    res.redirect(
      301,
      "/"
    );
  }
);

app.get(
  [
    "/s=water20heater20blanket",
    "/s=air20mover",
    "/s=drysmart20d330",
    "/s=vanity w/ undermount sink",
    "/s=vanity%20w/%20undermount%20sink",
    "/s=skid20plates",
    "/s=storage20container",
    "/s=finish20carpentry",
    "/s=outlet20cover",
    "/s=decontamination20&20after20hours",
    "/s=driheat20ita75",
    "/s=diagonal20tile",
    "/s=dryer20detach20&20reset",
    "/s=refrigerator20detach20&20reset",
    "/s=on-site20storage20container",
    "/s=fiberglass20tub",
    "/s=digital20asset",
    "/s=garbage20disposal",
    "/s=ems20activities",
    "/s=asbestos abatement (vinyl tile & mastic)",
    "/s=asbestos%20abatement%20(vinyl%20tile%20&%20mastic)",
    "/s=thermal dbk",
    "/s=thermal%20dbk",
    "/s=project20manager",
    "/s=detach20&20reset",
    "/s=drymatic20ii",
    "/s=drymatic ii",
    "/s=negative20air20ducting",
    "/s=cement20board",
    "/s=calcium20chloride",
    "/s=tile20backsplash",
    "/s=heavy20duty",
    "/s=z20flashing",
    "/s=tes20200k20trailer",
    "/s=angle20stop",
    "/actionable-insights-socks/",
  ],
  function (req, res) {
    res.redirect(
      301,
      "/search"
    );
  }
);

app.get(
  [
    "/event/xactimate-level-1-training-san-diego-ca-jul-2019/",
    "/event/actionable-xactimate-profile-and-xact-best-practices-bootcamp-feb-19",
    "/event/xactimate-digital-assets-Oct25-27",
    "/training-future-today/",
    "/event/Actionable-Xactimate-Profile-Virtual-Onboarding-Dec-28",
    "/event/private-training-engagement-Aug-30-1-Sept",
    "/event/xactimate-digital-assets-may-3-2022",
    "/event/Actionable-Xactimate-Profile-and-Xact-Best-Practices-Bootcamp-sept28",
    "/event/private-training-engagement-Oct-9",
    "/event/Actionable-Xactimate-Profile-Virtual-Onboarding-May-2",
    "/event/leveraging-geomni-matterport-20th-september-2019-san-diego-ca/",
    "/event/Actionable-Xactimate-Profile-Virtual-Onboarding-Aug-3",
    "/event/Actionable-Xactimate-Profile-Virtual-Onboarding-July-6",
  ],
  function (req, res) {
    res.redirect(
      301,
      "/events"
    );
  }
);

app.get(
  [
    "/category/video-gallery/?post_type=yt_videos",
  ],
  function (req, res) {
    res.redirect(
      301,
      "/video-gallery"
    );
  }
);

app.get(
  [
    "/resources/price-list-update-summary/december-2019",
    "/resources/price-list-update-summary/null",
    "/resources/price",
  ],
  function (req, res) {
    res.redirect(
      301,
      "/resources/price-list-update-summary"
    );
  }
);

app.get(
  [
    "/insight-sheet-",
    "/insight-sheets/feed/",
    "/insight-sheets/driheat-power-dist/",
  ],
  function (req, res) {
    res.redirect(
      301,
      "/insight-sheets"
    );
  }
);

app.get(
  [
    "/my-accountmeta",
  ],
  function (req, res) {
    res.redirect(
      301,
      "/my-account"
    );
  }
);

app.get(
  [
    "/aimc-ce/",
  ],
  function (req, res) {
    res.redirect(
      301,
      "/aimc"
    );
  }
);

app.get(
  [
    "/media-release/restoration-industry-association-and-actionable-insights-announce-partnership",
  ],
  function (req, res) {
    res.redirect(
      301,
      "/media-release"
    );
  }
);

// app.get(
//   [
//     "/event/private-training-engagement-Aug-30-1-Sept",
//     "/event/Actionable-Xactimate-Profile-Virtual-Onboarding-May-2",
//     "/event/xactimate-digital-assets-feb23",
//     "/event/private-training-engagement-january-19",
//     "/event/xactimate-level-2-training-mesa-oct-2018",
//     "/event/leveraging-geomni-matterport-digital-assets-claims-environment-2nd-november-2018-san-diego-ca",
//     "/event/private-training-engagement-July-18",
//     "/event/private-training-engagement-april-13",
//     "/event/private-training-engagement-may-11",
//     "/event/private-training-engagement-july-13",
//     "/event/private-training-engagement-august-10",
//     "/event/xactimate-digital-assets-april-27",
//     "/event/xactimate-digital-assets-july-20",
//     "/event/xactimate-digital-assets-october-5",
//     "/event/carrier-guidelines-25th-october-2018-denver-co",
//     "/event/xactimate-level-2-training-san-diego-feb-2019",
//     "/event/xactimate-level-1-training-san-diego-ca-jul-2019",
//     "/event/carrier-guidelines-20th-february-2019-phoenix-az",
//     "/event/leveraging-geomni-matterport-digital-assets-claims-environment-8th-march-2019-san-diego-ca",
//     "/event/carrier-guidelines-6th-december-2018-denver-co",
//     "/event/private-training-engagement-september-14",
//     "/event/private-training-engagement-september-22",
//     "/event/private-training-engagement-october-18",
//     "/event/private-training-engagement-october-21",
//     "/event/private-training-engagement-november-2",
//     "/event/xactimate-digital-assets-february-23-2022",
//     "/event/xactimate-digital-assets-may-2-2022",
//     "/event/private-training-engagement-december-14-2021",
//     "/event/private-training-engagement-january-26-2022",
//     "/event/private-training-engagement-february-1-2022",
//     "/event/private-training-engagement-march-1-2022",
//     "/event/private-training-engagement-march-15-2022",
//     "/event/private-training-engagement-april-5-2022",
//     "/event/private-training-engagement-april-7-2022",
//     "/event/private-training-engagement-april-19-2022",
//     "/event/private-training-engagement-april-26-2022",
//     "/event/december-san-diego-2017-carrier-guidelines",
//     "/event/carrier-guidelines-13th-march-2019-san-diego-ca",
//     "/event/race-with-the-machines",
//     "/event/xactimate-level-1-training-san-diego",
//     "/event/xactimate-level-2-training-san-diego",
//     "/event/race-machines-raffle",
//     "/event/carrier-guidelines-1st-august-2019-denver-co",
//     "/event/carrier-guidelines-10th-april-2019-los-angeles-ca",
//     "/event/leveraging-geomni-matterport-10th-may-2019-san-diego-ca",
//     "/event/carrier-guidelines-12th-june-2019-san-diego-ca",
//     "/event/private-training-engagement-May-23-26-May",
//     "/event/documenting-claims-3d-matterport-ria-convention",
//     "/event/xactimate-digital-assets-Dec",
//     "/event/next-level-conference-atlanta-area-ga",
//     "/event/leveraging-geomni-matterport-12th-july-2019-san-diego-ca",
//     "/event/xactimate-digital-assets-oct7",
//     "/event/ccnc-lake-tahoe-ca-claims-conference-northern-california",
//     "/event/carrier-guidelines-26th-june-2019-phoenix-az",
//     "/event/xactimate-level-3-training-san-diego",
//     "/event/xactimate-level-2-training-san-diego-june-2018",
//     "/event/private-training-engagement-April-23-26-April",
//     "/event/xactimate-digital-assets-feb-21-2023",
//     "/event/mortgage-lenders-webinar-22nd-november-2019-san-diego-ca",
//     "/event/private-training-engagement-Aug-16-18",
//     "/event/xactimate-level-1-training-san-diego-ca-dec-2019",
//     "/event/xactimate-digital-assets-July19-21",
//     "/event/leveraging-matterport-6th-march-2020-san-diego-ca",
//     "/event/march-2018-carrier-guidelines-san-diego",
//     "/event/Actionable-Xactimate-Profile-Virtual-Onboarding-June-6",
//     "/event/xactimate-digital-assets-jun20",
//     "/event/xactimate-level-1-training-east-bay-april-2018",
//     "/event/xactimate-level-1-training-san-diego-september-2018",
//     "/event/carrier-guidelines-14th-october-2020-los-angeles-ca",
//     "/event/private-training-engagement-april-22",
//     "/event/private-training-engagement-april-28",
//     "/event/private-training-engagement-may-27",
//     "/event/private-training-engagement-june-9-2020",
//     "/event/private-training-engagement-june-23",
//     "/event/private-training-engagement-march-9",
//     "/event/private-training-engagement-november-3",
//     "/event/Xact-Mobile-wLiDar-San-Diego-CA-March-31",
//     "/event/carrier-guidelines-13th-june-2018-san-diego",
//     "/event/Actionable-Xactimate-Profile-Virtual-Onboarding-Aug-3",
//     "/event/move-needle-invitation",
//     "/event/xactimate-level-1-training-may-2018-san-diego",
//     "/event/xactimate-digital-assets-may-9-2022",
//     "/event/private-training-engagement-july-15",
//     "/event/private-training-engagement-july-21",
//     "/event/private-training-engagement-december-1",
//     "/event/private-training-engagement-june-9",
//     "/event/private-training-engagement-october-20",
//     "/event/Actionable-Xactimate-Profile-Virtual-Onboarding-July-6",
//     "/event/private-training-engagement-Feb-06-10-Feb",
//     "/event/Actionable-Xactimate-Profile-Virtual-Onboarding-Oct-10",
//     "/event/Actionable-Xactimate-Profile-Virtual-Onboarding-Aug-9",
//     "/event/Actionable-Xactimate-Profile-and-Xact-Best-Practices-Bootcamp-jun29",
//     "/event/private-training-engagement-Sept-12-14-Sept",
//     "/event/xactimate-digital-assets-Oct25-27",
//   ],
//   function (req, res) {
//     res.redirect(301, "/events");
//   }
// );

app.get(
  [
    "/search/*",
    "/s=",
    "/s=gas20range20detach20&20reset",
    "/s=attic20vent",
    "/s=dryout",
    "/s=drysmart20lp250",
    "/s=edge20wrap",
    "/s=gas20range",
    "/s=gas20range20detach20&20reset",
    "/s=insulation20&amp;20drywall20behind20toilet",
    "/s=invoicing20for20matterport",
    "/s=masts",
    "/s=oven20detach20&amp;20reset",
    "/s=project20management",
    "/s=refridgerator",
    "/s=stucco20repair",
    "/s=thermal20dbk",

    "/tag",
    "/tag/*",
    "/venue",
    "/venue/*",
    "/delete_comment.php",
    "/contractor-beware",
    "/video_type",
    "/video_type/*",
    "/img_crop_to_file.php",
    "/category",
    "/category/*",
    "/wp-content",
    "/wp-content/*",
    "/events/category/*",
    "/event/xactimate-digital-assets-may-3-2022",
    "/xactimate-level-1-san-diego",
    "/terms-and-conditions-zora",
    "/event/__META_CAN__",
    "/event/xactimate-digital-assets-jan20/__META_CAN__",
    "/solidifai",
    "/rating_avg.php",
    "/events/tag/*",
    "/resources/price-list-update-summary/december-2019",
    "/resources/price-list-update-summary/price-list-update-summary-january-2025",
    "/aitc",
    "/resources/price-list-update-summary/null",
    "/s=packout/packback labor",
    "/s=piano packout/packback",
    "/gi-admin/?redirect_to=https://www.getinsights.org/event/leveraging-geomni-matterport-digital-assets-claims-environment-2nd-november-2018-san-diego-ca/",
    "/greentan-hat",
    "/training-future-today",
    "/video-gallery/matter-hacks-import-export-scan-matterport-capture-app",
    "/3d-training-modules",
    "/zora-solidifa",
    "/gi-admin/?redirect_to=https://www.getinsights.org/event/xactimate-level-1-training-may-2018-san-diego/",
    "/video-gallery/__META_CAN__",
    "/img_save_to_file.php",
    "/shop/membership-plans/?pm=1",
    "/gift-cards/3d-training-modules",
    "/event/xactimate-digital-assets-april-26-2022",
    "/advance-legislation",
    "/event/xactimate-digital-assets-april-26-2022",
    "/s=billiard packout/packback",
    "/rate.php",
    "/pcrc",
    "/sponsor-a-student",
    "/event/xactimate-digital-assets-Dec6-8",
    "/shop/membership-plans/?pm=1",
    "/event/carrier-guidelines-20th-february-2019-phoenix-az/feed/",
    "/edit_reply.php",
    "/users-membership-status",
    "/zora-solidifai",
    "/peer-review",
    "/ai-veto-bag",
    "/swag-page",
    "/ai-airpods",
    "/insight-sheets/tag/refridgerator/__META_CAN__",
    "/shop/form/solidifai",
    "/insight-sheets/tag/appliance/__META_CAN__",
    "/toxic-exposure-structure-fire",
    "/aimc-ce",
    "/aimc-ce/*",
    "/add_comment.php",
    "/resources/video-gallery/",
    "/insight-sheets/tag/*",
    "/xactimate-history-future/",
    "/insight-sheets/infratech-ir-lamp/__META_CAN__",
    "/toxic-exposure-structure-fire/",
    "/insight-sheets/infratech-ir-lamp/",
    "/actionable-xactimate-",
    "/search/gas-range-detach-reset/feed/rss2/",
    "/search/wall/my-account/feed/rss2/",
    "/events/category/annual-events/list/",
    "/feed/",
    "/sponsorship-inquiry/",
    "/regional-chapters/",
    "/peer-review/",
    "/resources/gift-cards/",
    "/event/xactimate-level-1-training-san-diego-ca-jul-2019/",
  ],
  function (req, res) {
    const filePath = path.resolve(__dirname, "..", "build", "index.html");
    res.status(404);

    console.log(filePath, "path");

    fs.readFile(filePath, "utf8", function (err, htmlData) {
      if (err) {
        return console.log(err);
      }
      htmlData = htmlData
        .replace(/{{title}}/, `Actionable Insights`)
        .replace("__META_OG_TITLE__", "Actionable Insights")
        .replace(
          "__META_OG_DESCRIPTION__",
          "The Actionable Xactimate Profile is an estimating solution that provides live estimating guidance within Xactimate, helping guide Xactimate users toward a complete and thorough scope of work. The tool aims to give equal credence to both overages as well as omissions, help reduce cycle times, champion a spirit of fairly settled claims, and foster environments of reasonable profits."
        )
        .replace(
          "__META_DESCRIPTION__",
          "The Actionable Xactimate Profile is an estimating solution that provides live estimating guidance within Xactimate, helping guide Xactimate users toward a complete and thorough scope of work. The tool aims to give equal credence to both overages as well as omissions, help reduce cycle times, champion a spirit of fairly settled claims, and foster environments of reasonable profits."
        )
        .replace(
          "__META_OG_IMAGE__",
          "https://getinsights2-data.s3.amazonaws.com/OG.png"
        )
        .replace(
          "__META_CAN__",
          ` ${("https" + "://" + req.get("host") + req.originalUrl).replace(
            "wwww.",
            ""
          )}`
        );
      res.send(htmlData);
    });
  }
);

function matchPath(pathname, options) {
  const { path, exact = false } = options;

  // If the path is exact and doesn't contain any parameters, do a simple string comparison
  if (exact && path === pathname) {
    return { path, url: path, isExact: true };
  }

  // Split the path and pathname into segments
  const pathSegments = path.split("/");
  const pathnameSegments = pathname.split("/");

  // If the number of segments is different, there's no match
  if (pathSegments.length !== pathnameSegments.length) {
    return null;
  }

  // Iterate over the segments and check for matches
  const params = {};
  for (let i = 0; i < pathSegments.length; i++) {
    const pathSegment = pathSegments[i];
    const pathnameSegment = pathnameSegments[i];

    // Check if the path segment is a parameter
    if (pathSegment.startsWith(":")) {
      const paramName = pathSegment.slice(1);
      params[paramName] = pathnameSegment;
    } else if (pathSegment !== pathnameSegment) {
      // If the segments don't match and it's not a parameter, there's no match
      return null;
    }
  }

  // If we've reached this point, there's a match
  return { path, url: pathname, isExact: true, params };
}

// app.all(/.*/, function (req, res, next) {
//   var host = req.header("host");
//   if (host.match(/^www\..*/i)) {
//     next();
//   } else {
//     res.redirect(301, "https://" + host);
//   }
// });

function checkUrl(req, res, next) {
  console.log("first", req.headers["x-forwarded-proto"], req.headers, req);
  let host = req.headers.host;
  if (
    (host.match(/^www\..*/i) ||
      req.headers["x-forwarded-proto"] !== "https" ||
      req.url.endsWith("/")) &&
    req.url !== "/"
  ) {
    console.log("first 3omg");

    return res.redirect(
      301,
      "https://" +
        host.replace("www.", "") +
        req.url.replace(/\/+$/, "").replace(/\%/, "").toLowerCase()
    );
  } else if (
    host.match(/^www\..*/i) ||
    req.headers["x-forwarded-proto"] !== "https"
  ) {
    console.log("first omg");
    return res.redirect(301, "https://" + host.replace("www.", "") + req.url);
  }
  next();
}

app.use(checkUrl);

function nonTrailing(req, res, next) {
  let host = req.headers.host;
  if (req.url.endsWith("/") && req.url !== "/") {
    return res.redirect(
      301,
      "https://" +
        host.replace("www.", "") +
        req.url.replace(/\/+$/, "").replace(/\%/, "").toLowerCase()
    );
  }
  next();
}

app.use(nonTrailing);

// function UpperToLowerCase(req, res, next) {
//   let host = req.headers.host;
//   const substr = "buy-event" || "buy-certification";
//   if (req.url !== req.url.toLowerCase() && !req.url.includes(substr)) {
//     console.log(req.url);
//     return res.redirect(
//       301,
//       "https://" + host.replace("www.", "") + req.url.toLowerCase()
//     );
//   }
//   next();
// }

// app.use(UpperToLowerCase);

function RemovePercentageSign(req, res, next) {
  let host = req.headers.host;
  if (req.url.endsWith("%")) {
    return res.redirect(
      301,
      "https://" + host.replace("www.", "") + req.url.replace(/\%/, "")
    );
  }
  next();
}

app.use(RemovePercentageSign);

//server error urls for pricelist

app.get("/", function (req, res) {
  console.log("hello");
  const filePath = path.resolve(__dirname, "..", "build", "index.html");
  fs.readFile(filePath, "utf8", function (err, htmlData) {
    if (err) {
      return console.log(err);
    }
    htmlData = htmlData
      .replace(/{{title}}/, `Actionable Insights | Resources for Xactimate & Matterport`)
      .replace("__META_OG_TITLE__", "Actionable Insights | Resources for Xactimate & Matterport")
      .replace(
        "__META_OG_DESCRIPTION__",
        "Actionable Insights is an educational non-profit that creates tools and resources for claims professionals to master Xactimate and Matterport."
      )
      .replace(
        "__META_DESCRIPTION__",
        "Actionable Insights is an educational non-profit that creates tools and resources for claims professionals to master Xactimate and Matterport."
      )
      .replace(
        "__META_OG_IMAGE__",
        "https://getinsights2-data.s3.amazonaws.com/OG.png"
      )
      .replace("__META_CAN__", `https://getinsights.org`);
    res.send(htmlData);
  });
});

//events 301 redirect

//Insightsheets DB

app.get("/insight-sheets", function (req, res) {
  const filePath = path.resolve(__dirname, "..", "build", "index.html");

  fs.readFile(filePath, "utf8", function (err, htmlData) {
    if (err) {
      return console.log(err);
    }

    htmlData = htmlData
      .replace(/{{title}}/, `Insight Sheet | Xactimate Cheat Sheets by Actionable Insights`)
      .replace(
        "__META_OG_TITLE__",
        `Insight Sheet | Xactimate Cheat Sheets by Actionable Insights`
      )
      .replace(
        "__META_OG_DESCRIPTION__",
        "Our insight sheet database has 110+ Xactimate estimate templates for different restoration scenarios. Try now to increase the accuracy of your estimates."
      )
      .replace(
        "__META_DESCRIPTION__",
        "Our insight sheet database has 110+ Xactimate estimate templates for different restoration scenarios. Try now to increase the accuracy of your estimates.."
      )

      .replace(
        "__META_OG_IMAGE__",
        "https://getinsights2-data.s3.amazonaws.com/OG.png"
      )
      .replace(
        "__META_CAN__",
        ` ${("https" + "://" + req.get("host") + req.originalUrl).replace(
          "wwww.",
          ""
        )}`
      );
    return res.send(htmlData);
  });
});

app.get("/insight-sheets/*", function (req, res) {
  const filePath = path.resolve(__dirname, "..", "build", "index.html");

  fs.readFile(filePath, "utf8", function (err, htmlData) {
    if (err) {
      return console.log(err);
    }

    const sheetPermalink = req.path
      .replace("/insight-sheets/", "")
      .replace(/\/$/, "");
    getSheetByPermalink = (permalink) => {
      axios
        .post(
          `${appConfig[req.hostname]}:${
            appConfig.serverPort
          }/${"Public"}/GetInsightSheetByPermalink?permalink=${permalink}`
        )
        .then((ress) => {
          if (ress.data.Requested_Action === false) {
            return res.status(404).send(htmlData);
          } else {
            htmlData = htmlData
              .replace(
                /{{title}}/,
                ress.data
                  ? ress.data.data.metatitle
                    ? ress.data.data.metatitle
                    : ress.data.data.tabtitle
                    ? ress.data.data.tabtitle
                    : "Insight Sheet Database - Actionable Insights"
                  : "Insight Sheet Database - Actionable Insights"
              )
              .replace(
                "__META_OG_TITLE__",
                ress.data
                  ? ress.data.data.metatitle
                    ? ress.data.data.metatitle
                    : ress.data.data.tabtitle
                    ? ress.data.data.tabtitle
                    : "Insight Sheet Database - Actionable Insights"
                  : "Insight Sheet Database - Actionable Insights"
              )
              .replace(
                "__META_OG_DESCRIPTION__",
                ress.data.data.metadescription
                  ? ress.data.data.metadescription
                  : ress.data.data.featureddescription
                  ? ress.data.data.featureddescription.substring(0, 170)
                  : "Want a cheat sheet for Xactimate Sheets? Here’s a set of ‘insight sheets’ to help you with your next estimate."
              )
              .replace(
                "__META_DESCRIPTION__",
                ress.data.data.metadescription
                  ? ress.data.data.metadescription
                  : ress.data.data.featureddescription
                  ? ress.data.data.featureddescription.substring(0, 170)
                  : "Want a cheat sheet for Xactimate Sheets? Here’s a set of ‘insight sheets’ to help you with your next estimate."
              )
              .replace(
                "__META_OG_IMAGE__",
                ress.data.data.facebookogimage
                  ? ress.data.data.facebookogimage
                  : ress.data.data.featureimage
              )
              .replace(
                "__META_CAN__",
                ` ${(
                  "https" +
                  "://" +
                  req.get("host") +
                  req.originalUrl
                ).replace("wwww.", "")}`
              );
            return res.send(htmlData);
          }
        })
        .catch((error) => {
          console.error(error);
        });
    };

    getSheetByPermalink(sheetPermalink);
  });
});

//VIDEOGALLERY

app.get("/s=*", function (req, res) {
  const filePath = path.resolve(__dirname, "..", "build", "index.html");

  fs.readFile(filePath, "utf8", function (err, htmlData) {
    if (err) {
      return console.log(err);
    }

    htmlData = htmlData
      .replace(/{{title}}/, `Search Results - Actionable Insights`)
      .replace("__META_OG_TITLE__", `Search Results - Actionable Insights`)
      .replace(
        "__META_OG_DESCRIPTION__",
        "Here's our search result database. Search everything from insightsheets to price list update summary and explore more about actionable profile  and what we have to offer."
      )
      .replace(
        "__META_DESCRIPTION__",
        "Here's our search result database. Search everything from insightsheets to price list update summary and explore more about actionable profile and what we have to offer."
      )
      .replace(
        "__META_OG_IMAGE__",
        "https://getinsights2-data.s3.amazonaws.com/OG.png"
      )
      .replace(
        "__META_CAN__",
        ` ${("https" + "://" + req.get("host") + req.originalUrl).replace(
          "wwww.",
          ""
        )}`
      );
    return res.send(htmlData);
  });
});

app.get("/video-gallery", function (req, res) {
  const filePath = path.resolve(__dirname, "..", "build", "index.html");

  fs.readFile(filePath, "utf8", function (err, htmlData) {
    if (err) {
      return console.log(err);
    }

    htmlData = htmlData
      .replace(/{{title}}/, `Video Gallery by Actionable Insights | Xactimate Matterport`)
      .replace(
        "__META_OG_TITLE__",
        `Video Gallery by Actionable Insights | Xactimate Matterport`
      )
      .replace(
        "__META_OG_DESCRIPTION__",
        "An archive of Actionable Insights videos including Xactimate tips, Matterport tricks, Xactimate price list updates, & more informative content accessible for free."
      )
      .replace(
        "__META_DESCRIPTION__",
        "An archive of Actionable Insights videos including Xactimate tips, Matterport tricks, Xactimate price list updates, & more informative content accessible for free."
      )
      .replace(
        "__META_OG_IMAGE__",
        "https://getinsights2-data.s3.amazonaws.com/OG.png"
      )
      .replace(
        "__META_CAN__",
        ` ${("https" + "://" + req.get("host") + req.originalUrl).replace(
          "wwww.",
          ""
        )}`
      );
    return res.send(htmlData);
  });
});

app.get("/video-gallery/*", function (req, res) {
  const filePath = path.resolve(__dirname, "..", "build", "index.html");

  fs.readFile(filePath, "utf8", function (err, htmlData) {
    if (err) {
      return console.log(err);
    }
    console.log(req.path);

    const videoPermalink = req.path
      .replace("/video-gallery/", "")
      .replace(/\/$/, "");
    getVideoByPermalink = (permalink) => {
      axios
        .post(
          `${appConfig[req.hostname]}:${
            appConfig.serverPort
          }/${"Public"}/GetVideoGallaryItems`
        )
        .then((ress) => {
          const data = ress.data.data.filter(
            (insighterreport) => insighterreport.permalink === permalink
          )[0];
          console.log(data, ress);
          if (
            ress.data.Requested_Action === false ||
            !data ||
            data?.draft === true
          ) {
            return res.status(404).send(htmlData);
          } else {
            htmlData = htmlData
              .replace(
                /{{title}}/,
                data
                  ? data.metatitle
                    ? data.metatitle
                    : data.tabtitle
                    ? data.tabtitle
                    : `Video Gallery Archive - Actionable Insights`
                  : `Video Gallery Archive - Actionable Insights`
              )
              .replace(
                "__META_OG_TITLE__",
                data
                  ? data.metatitle
                    ? data.metatitle
                    : data.tabtitle
                    ? data.tabtitle
                    : `Video Gallery Archive - Actionable Insights`
                  : `Video Gallery Archive - Actionable Insights`
              )
              .replace(
                "__META_OG_DESCRIPTION__",
                data
                  ? data.metadescription
                    ? data.metadescription
                    : data.featureddescription
                    ? data.featureddescription
                    : "Check out all of Actionable Insights video resouces. From tutorials to sample scans and much more. Here's how you get access to the video gallery."
                  : "Check out all of Actionable Insights video resouces. From tutorials to sample scans and much more. Here's how you get access to the video gallery."
              )
              .replace(
                "__META_DESCRIPTION__",
                data
                  ? data.metadescription
                    ? data.metadescription
                    : data.featureddescription
                    ? data.featureddescription
                    : "Check out all of Actionable Insights video resouces. From tutorials to sample scans and much more. Here's how you get access to the video gallery."
                  : "Check out all of Actionable Insights video resouces. From tutorials to sample scans and much more. Here's how you get access to the video gallery."
              )
              .replace(
                "__META_OG_IMAGE__",
                data.facebookogimage
                  ? data.facebookogimage
                  : "https://getinsights2-data.s3.amazonaws.com/OG.png"
              )
              .replace(
                "__META_CAN__",
                ` ${(
                  "https" +
                  "://" +
                  req.get("host") +
                  req.originalUrl
                ).replace("wwww.", "")}`
              );
            return res.send(htmlData);
          }
        })
        .catch((error) => {
          console.error(error);
        });
    };

    getVideoByPermalink(videoPermalink);
  });
});

//EVENTS

app.get("/events", function (req, res) {
  const filePath = path.resolve(__dirname, "..", "build", "index.html");

  fs.readFile(filePath, "utf8", function (err, htmlData) {
    if (err) {
      return console.log(err);
    }

    htmlData = htmlData
      .replace(/{{title}}/, `Actionable Insights Events | Matterport and Xactimate Training`)
      .replace("__META_OG_TITLE__", `Actionable Insights Events | Matterport and Xactimate Trainings`)
      .replace(
        "__META_OG_DESCRIPTION__",
        "Regular events revolving around Matterport training and learning Xactimate for pros of all levels. Check our our demand and live events."
      )
      .replace(
        "__META_DESCRIPTION__",
        "Regular events revolving around Matterport training and learning Xactimate for pros of all levels. Check our our demand and live events."
      )
      .replace(
        "__META_OG_IMAGE__",
        "https://getinsights2-data.s3.amazonaws.com/OG.png"
      )
      .replace(
        "__META_CAN__",
        ` ${("https" + "://" + req.get("host") + req.originalUrl).replace(
          "wwww.",
          ""
        )}`
      );
    return res.send(htmlData);
  });
});

app.get("/event/*", function (req, res) {
  const filePath = path.resolve(__dirname, "..", "build", "index.html");

  fs.readFile(filePath, "utf8", function (err, htmlData) {
    if (err) {
      return console.log(err);
    }

    const eventPermalink = req.path.replace("/event/", "").replace(/\/$/, "");
    getEventByPermalink = (permalink) => {
      axios
        .post(
          `${appConfig[req.hostname]}:${
            appConfig.serverPort
          }/${"Public"}/GetAllEvents`
        )
        .then((ress) => {
          const data = ress.data.data.filter(
            (event) => event.permalink === permalink
          )[0];

          console.log(permalink, req);
          if (ress.data.Requested_Action === false || !data) {
            return res.status(404).send(htmlData);
          } else {
            htmlData = htmlData
              .replace(
                /{{title}}/,
                data
                  ? data.metatitle
                    ? data.metatitle
                    : data.tabtitle
                    ? data.tabtitle
                    : `Events - Actionable Insights`
                  : `Events - Actionable Insights`
              )
              .replace(
                "__META_OG_TITLE__",
                data
                  ? data.metatitle
                    ? data.metatitle
                    : data.tabtitle
                    ? data.tabtitle
                    : `Events - Actionable Insights`
                  : `Events - Actionable Insights`
              )
              .replace(
                "__META_OG_DESCRIPTION__",
                data.metadescription
                  ? data.metadescription
                  : data.featureddescription
                  ? data.featureddescription
                  : "Look out for these Actionable Insights Events. Bring it all together and attend our highly produced, invaluable events, and leave with 'Actionable' information - (Xactimate Estimating & Digital Assets Class (San Diego, CA)$750Register Now. May 3rd, 2022 - May 5th, 2022. This course will stream live online! Tickets for the online course are the same ticket class/price as attending in person. GAME CHANGER: We did it again!)"
              )
              .replace(
                "__META_DESCRIPTION__",
                data.metadescription
                  ? data.metadescription
                  : data.featureddescription
                  ? data.featureddescription
                  : "Look out for these Actionable Insights Events. Bring it all together and attend our highly produced, invaluable events, and leave with 'Actionable' information - (Xactimate Estimating & Digital Assets Class (San Diego, CA)$750Register Now. May 3rd, 2022 - May 5th, 2022. This course will stream live online! Tickets for the online course are the same ticket class/price as attending in person. GAME CHANGER: We did it again!)"
              )
              .replace(
                "__META_OG_IMAGE__",
                data.facebookogimage
                  ? data.facebookogimage
                  : "https://getinsights2-data.s3.amazonaws.com/OG.png"
              )
              .replace(
                "__META_CAN__",
                ` ${(
                  "https" +
                  "://" +
                  req.get("host") +
                  req.originalUrl
                ).replace("wwww.", "")}`
              );
            return res.send(htmlData);
          }
        })
        .catch((error) => {
          console.error(error);
        });
    };

    getEventByPermalink(eventPermalink);
  });
});

// Actionable Xactimate Profile

app.get("/actionable-xactimate-profile", function (req, res) {
  const filePath = path.resolve(__dirname, "..", "build", "index.html");

  fs.readFile(filePath, "utf8", function (err, htmlData) {
    if (err) {
      return console.log(err);
    }

    htmlData = htmlData
      .replace(/{{title}}/, `Actionable Xactimate Profile | Live Guidance For Your Estimates`)
      .replace("__META_OG_TITLE__", `Actionable Xactimate Profile | Live Guidance For Your Estimates`)
      .replace(
        "__META_OG_DESCRIPTION__",
        "Write more accurate Xactimate estimates with live guidance in the Actionable Profile. No more mistakes, no more missed line items. Try it today."
      )
      .replace(
        "__META_DESCRIPTION__",
        "Write more accurate Xactimate estimates with live guidance in the Actionable Profile. No more mistakes, no more missed line items. Try it today."
      )
      .replace(
        "__META_OG_IMAGE__",
        "https://getinsights2-data.s3.amazonaws.com/ActionableProfile.png"
      )
      .replace(
        "__META_CAN__",
        ` ${("https" + "://" + req.get("host") + req.originalUrl).replace(
          "wwww.",
          ""
        )}`
      );
    return res.send(htmlData);
  });
});

// Xactimate Sketch Gallery

app.get("/online-sketch-gallery", function (req, res) {
  const filePath = path.resolve(__dirname, "..", "build", "index.html");

  fs.readFile(filePath, "utf8", function (err, htmlData) {
    if (err) {
      return console.log(err);
    }

    htmlData = htmlData
      .replace(/{{title}}/, `Sketch Gallery by Actionable Insights | Free Xactimate Sketches`)
      .replace("__META_OG_TITLE__", `Xactimate Sketch Gallery`)
      .replace(
        "__META_OG_DESCRIPTION__",
        "Over 100 free Xactimate sketches including staircases, hallways, roofs, rooms, & more. Download a template from the Xactimate Online Sketch Gallery."
      )
      .replace(
        "__META_DESCRIPTION__",
        "Over 100 free Xactimate sketches including staircases, hallways, roofs, rooms, & more. Download a template from the Xactimate Online Sketch Gallery."
      )
      .replace(
        "__META_OG_IMAGE__",
        "https://getinsights2-data.s3.amazonaws.com/OG.png"
      )
      .replace(
        "__META_CAN__",
        ` ${("https" + "://" + req.get("host") + req.originalUrl).replace(
          "wwww.",
          ""
        )}`
      );
    return res.send(htmlData);
  });
});

// Xactimate Macros

app.get("/macros", function (req, res) {
  const filePath = path.resolve(__dirname, "..", "build", "index.html");

  fs.readFile(filePath, "utf8", function (err, htmlData) {
    if (err) {
      return console.log(err);
    }

    htmlData = htmlData
      .replace(/{{title}}/, `Xactimate Macros to Boost Your Productivity | Actionable Insights`)
      .replace("__META_OG_TITLE__", `Xactimate Macros to Boost Your Productivity | Actionable Insights`)
      .replace(
        "__META_OG_DESCRIPTION__",
        "Access over 100 Xactimate Macros supplemented by detailed F9 notes. Increase your productivity with Actionable Insights Macros. Explore now."
      )
      .replace(
        "__META_DESCRIPTION__",
        "Access over 100 Xactimate Macros supplemented by detailed F9 notes. Increase your productivity with Actionable Insights Macros. Explore now.."
      )
      .replace(
        "__META_OG_IMAGE__",
        "https://getinsights2-data.s3.amazonaws.com/OG.png"
      )
      .replace(
        "__META_CAN__",
        ` ${("https" + "://" + req.get("host") + req.originalUrl).replace(
          "wwww.",
          ""
        )}`
      );
    return res.send(htmlData);
  });
});

// Blog

app.get("/blog", function (req, res) {
  const filePath = path.resolve(__dirname, "..", "build", "index.html");

  fs.readFile(filePath, "utf8", function (err, htmlData) {
    if (err) {
      return console.log(err);
    }

    htmlData = htmlData
      .replace(/{{title}}/, `Blog`)
      .replace("__META_OG_TITLE__", `Blog`)
      .replace(
        "__META_OG_DESCRIPTION__",
        "Looking for the latest education tools and resources for the property insurance industry? Check out our Actionable Insights blog for valuable training tips, industry trends, and best practices to help you stay ahead of the curve. Learn how to leverage technology like Matterport and Xactimate to become more accurate and efficient. Browse our comprehensive blog library today! Gain a competitive edge in the property insurance industry with our expert tips and tricks."
      )
      .replace(
        "__META_DESCRIPTION__",
        "Looking for the latest education tools and resources for the property insurance industry? Check out our Actionable Insights blog for valuable training tips, industry trends, and best practices to help you stay ahead of the curve. Learn how to leverage technology like Matterport and Xactimate to become more accurate and efficient. Browse our comprehensive blog library today! Gain a competitive edge in the property insurance industry with our expert tips and tricks."
      )
      .replace(
        "__META_OG_IMAGE__",
        "https://getinsights2-data.s3.amazonaws.com/OG.png"
      )
      .replace(
        "__META_CAN__",
        ` ${("https" + "://" + req.get("host") + req.originalUrl).replace(
          "wwww.",
          ""
        )}`
      );
    return res.send(htmlData);
  });
});

// AnActionableGuideToTheInsightSheetDatabase

app.get("/blog/an-actionable-guide-to-the-insight-sheet-database", function (req, res) {
  const filePath = path.resolve(__dirname, "..", "build", "index.html");

  fs.readFile(filePath, "utf8", function (err, htmlData) {
    if (err) {
      return console.log(err);
    }

    htmlData = htmlData
      .replace(/{{title}}/, `An Actionable Guide To The Insight Sheet Database - Actionable Insights`)
      .replace("__META_OG_TITLE__", `An Actionable Guide To The Insight Sheet Database - Actionable Insights`)
      .replace(
        "__META_OG_DESCRIPTION__",
        "As part of Actionable Insights' aim to preserve the health of the property insurance ecosystem, we guide you about license reciprocity, which is one state honoring the licenses of another. - (Actionable Insights exists to help preserve the health of the property insurance ecosystem. To further this mission, we created this guide to help insurance)"
      )
      .replace(
        "__META_DESCRIPTION__",
        "As part of Actionable Insights' aim to preserve the health of the property insurance ecosystem, we guide you about license reciprocity, which is one state honoring the licenses of another. - (Actionable Insights exists to help preserve the health of the property insurance ecosystem. To further this mission, we created this guide to help insurance)"
      )
      .replace(
        "__META_OG_IMAGE__",
        "https://getinsights2-data.s3.amazonaws.com/OG.png"
      )
      .replace(
        "__META_CAN__",
        ` ${("https" + "://" + req.get("host") + req.originalUrl).replace(
          "wwww.",
          ""
        )}`
      );
    return res.send(htmlData);
  });
});

// DiscoverPreGeneratedVideosAndGifsInYourMatterportScansIntroduction

app.get("/blog/discover-pre-generated-videos-and-gifs-in-your-matterport-scans-introduction", function (req, res) {
  const filePath = path.resolve(__dirname, "..", "build", "index.html");

  fs.readFile(filePath, "utf8", function (err, htmlData) {
    if (err) {
      return console.log(err);
    }

    htmlData = htmlData
      .replace(/{{title}}/, `Increase Your Marketing with Matterport's Auto-Generated Videos and GIFs`)
      .replace("__META_OG_TITLE__", `Increase Your Marketing with Matterport's Auto-Generated Videos and GIFs`)
      .replace(
        "__META_OG_DESCRIPTION__",
        "Learn how Matterport empowers you with auto-generated videos and GIFs from your scans to fuel your marketing campaigns, educate your team, and impress stakeholders. Discover Matter Hacks and explore the possibilities today!"
      )
      .replace(
        "__META_DESCRIPTION__",
        "Learn how Matterport empowers you with auto-generated videos and GIFs from your scans to fuel your marketing campaigns, educate your team, and impress stakeholders. Discover Matter Hacks and explore the possibilities today!"
      )
      .replace(
        "__META_OG_IMAGE__",
        "https://getinsights2-data.s3.amazonaws.com/OG.png"
      )
      .replace(
        "__META_CAN__",
        ` ${("https" + "://" + req.get("host") + req.originalUrl).replace(
          "wwww.",
          ""
        )}`
      );
    return res.send(htmlData);
  });
});

//HowToImproveYourEstimates

app.get("/blog/how-to-improve-your-estimates", function (req, res) {
  const filePath = path.resolve(__dirname, "..", "build", "index.html");

  fs.readFile(filePath, "utf8", function (err, htmlData) {
    if (err) {
      return console.log(err);
    }

    htmlData = htmlData
      .replace(/{{title}}/, `Write accurate Xactimate estimates with the Actionable Profile`)
      .replace("__META_OG_TITLE__", `Write accurate Xactimate estimates with the Actionable Profile`)
      .replace(
        "__META_OG_DESCRIPTION__",
        "The Actionable Profile is reinventing estimating in Xactimate. Improve accuracy, catch mistakes, and include all warranted line items for more comprehensive estimates."
      )
      .replace(
        "__META_DESCRIPTION__",
        "The Actionable Profile is reinventing estimating in Xactimate. Improve accuracy, catch mistakes, and include all warranted line items for more comprehensive estimates."
      )
      .replace(
        "__META_OG_IMAGE__",
        "https://getinsights2-data.s3.amazonaws.com/OG.png"
      )
      .replace(
        "__META_CAN__",
        ` ${("https" + "://" + req.get("host") + req.originalUrl).replace(
          "wwww.",
          ""
        )}`
      );
    return res.send(htmlData);
  });
});

//ImportAndExportAScanFromTheMatterportCaptureApp

app.get("/blog/import-and-export-a-scan-from-the-matterport-capture-app", function (req, res) {
  const filePath = path.resolve(__dirname, "..", "build", "index.html");

  fs.readFile(filePath, "utf8", function (err, htmlData) {
    if (err) {
      return console.log(err);
    }

    htmlData = htmlData
      .replace(/{{title}}/, `How to Import and Export Matterport Scans Across Devices`)
      .replace("__META_OG_TITLE__", `How to Import and Export Matterport Scans Across Devices`)
      .replace(
        "__META_OG_DESCRIPTION__",
        "A step-by-step guide on transferring Matterport scans between devices using the import/export feature (with updated screenshots). Read more."
      )
      .replace(
        "__META_DESCRIPTION__",
        "A step-by-step guide on transferring Matterport scans between devices using the import/export feature (with updated screenshots). Read more."
      )
      .replace(
        "__META_OG_IMAGE__",
        "https://getinsights2-data.s3.amazonaws.com/OG.png"
      )
      .replace(
        "__META_CAN__",
        ` ${("https" + "://" + req.get("host") + req.originalUrl).replace(
          "wwww.",
          ""
        )}`
      );
    return res.send(htmlData);
  });
});

//ScanningLargeSpacesWithAMatterportPro3

app.get("/blog/scanning-large-spaces-with-a-matterport-pro3", function (req, res) {
  const filePath = path.resolve(__dirname, "..", "build", "index.html");

  fs.readFile(filePath, "utf8", function (err, htmlData) {
    if (err) {
      return console.log(err);
    }

    htmlData = htmlData
      .replace(/{{title}}/, `Step-by-step Guide to Take Matterport Scans of Large Spaces`)
      .replace("__META_OG_TITLE__", `Step-by-step Guide to Take Matterport Scans of Large Spaces`)
      .replace(
        "__META_OG_DESCRIPTION__",
        "Taking Matterport Scans of large spaces requires skills and guidance. Learn how to do it with our comprehensive guide. Read more."
      )
      .replace(
        "__META_DESCRIPTION__",
        "Taking Matterport Scans of large spaces requires skills and guidance. Learn how to do it with our comprehensive guide. Read more."
      )
      .replace(
        "__META_OG_IMAGE__",
        "https://getinsights2-data.s3.amazonaws.com/OG.png"
      )
      .replace(
        "__META_CAN__",
        ` ${("https" + "://" + req.get("host") + req.originalUrl).replace(
          "wwww.",
          ""
        )}`
      );
    return res.send(htmlData);
  });
});

//KeyboardShortcutsForXactimate

app.get("/blog/keyboard-shortcuts-for-xactimate", function (req, res) {
  const filePath = path.resolve(__dirname, "..", "build", "index.html");

  fs.readFile(filePath, "utf8", function (err, htmlData) {
    if (err) {
      return console.log(err);
    }

    htmlData = htmlData
      .replace(/{{title}}/, `Master Xactimate | Learn Commonly Used Xactimate Hotkeys`)
      .replace("__META_OG_TITLE__", `Master Xactimate | Learn Commonly Used Xactimate Hotkeys`)
      .replace(
        "__META_OG_DESCRIPTION__",
        "This comprehensive guide teaches you some of the best Xactimate keyboard shortcuts and why they matter. Read more"
      )
      .replace(
        "__META_DESCRIPTION__",
        "This comprehensive guide teaches you some of the best Xactimate keyboard shortcuts and why they matter. Read more"
      )
      .replace(
        "__META_OG_IMAGE__",
        "https://getinsights2-data.s3.amazonaws.com/OG.png"
      )
      .replace(
        "__META_CAN__",
        ` ${("https" + "://" + req.get("host") + req.originalUrl).replace(
          "wwww.",
          ""
        )}`
      );
    return res.send(htmlData);
  });
});

//HowToSaveRunExportAndImportMacrosForXactimate

app.get("/blog/how-to-save-run-export-and-import-macros-for-xactimate", function (req, res) {
  const filePath = path.resolve(__dirname, "..", "build", "index.html");

  fs.readFile(filePath, "utf8", function (err, htmlData) {
    if (err) {
      return console.log(err);
    }

    htmlData = htmlData
      .replace(/{{title}}/, `How to save, run, export, and import macros for Xactimate?`)
      .replace("__META_OG_TITLE__", `How to save, run, export, and import macros for Xactimate?`)
      .replace(
        "__META_OG_DESCRIPTION__",
        "A guide on saving, running, exporting, & importing macros for Xactimate including best practices & troubleshooting common issues. Read more."
      )
      .replace(
        "__META_DESCRIPTION__",
        "A guide on saving, running, exporting, & importing macros for Xactimate including best practices & troubleshooting common issues. Read more."
      )
      .replace(
        "__META_OG_IMAGE__",
        "https://getinsights2-data.s3.amazonaws.com/OG.png"
      )
      .replace(
        "__META_CAN__",
        ` ${("https" + "://" + req.get("host") + req.originalUrl).replace(
          "wwww.",
          ""
        )}`
      );
    return res.send(htmlData);
  });
});

//DeepLinksInMatterport

app.get("/blog/deep-links-in-matterport", function (req, res) {
  const filePath = path.resolve(__dirname, "..", "build", "index.html");

  fs.readFile(filePath, "utf8", function (err, htmlData) {
    if (err) {
      return console.log(err);
    }

    htmlData = htmlData
      .replace(/{{title}}/, `How to Create and Use Deep Links in Matterport`)
      .replace("__META_OG_TITLE__", `How to Create and Use Deep Links in Matterport`)
      .replace(
        "__META_OG_DESCRIPTION__",
        "A comprehensive guide to creating and using Deep Links in Matterport. Learn how to use this feature to make your estimates even better. Read more."
      )
      .replace(
        "__META_DESCRIPTION__",
        "A comprehensive guide to creating and using Deep Links in Matterport. Learn how to use this feature to make your estimates even better. Read more."
      )
      .replace(
        "__META_OG_IMAGE__",
        "https://getinsights2-data.s3.amazonaws.com/OG.png"
      )
      .replace(
        "__META_CAN__",
        ` ${("https" + "://" + req.get("host") + req.originalUrl).replace(
          "wwww.",
          ""
        )}`
      );
    return res.send(htmlData);
  });
});

//ViolationCautionAndWarningAlertsInXactimate

app.get("/blog/violation-caution-and-warning-alerts-in-xactimate", function (req, res) {
  const filePath = path.resolve(__dirname, "..", "build", "index.html");

  fs.readFile(filePath, "utf8", function (err, htmlData) {
    if (err) {
      return console.log(err);
    }

    htmlData = htmlData
      .replace(/{{title}}/, `What are Violation, Caution, and Warning Alerts in Xactimate?`)
      .replace("__META_OG_TITLE__", `What are Violation, Caution, and Warning Alerts in Xactimate?`)
      .replace(
        "__META_OG_DESCRIPTION__",
        "Violations, Cautions, and Warnings are three types of alerts in Xactimate. This article will help you understand each alert and how to address it. Read more."
      )
      .replace(
        "__META_DESCRIPTION__",
        "Violations, Cautions, and Warnings are three types of alerts in Xactimate. This article will help you understand each alert and how to address it. Read more."
      )
      .replace(
        "__META_OG_IMAGE__",
        "https://getinsights2-data.s3.amazonaws.com/OG.png"
      )
      .replace(
        "__META_CAN__",
        ` ${("https" + "://" + req.get("host") + req.originalUrl).replace(
          "wwww.",
          ""
        )}`
      );
    return res.send(htmlData);
  });
});

//HowToUseXactimateSketchGallery

app.get("/blog/how-to-use-xactimate-sketch-gallery", function (req, res) {
  const filePath = path.resolve(__dirname, "..", "build", "index.html");

  fs.readFile(filePath, "utf8", function (err, htmlData) {
    if (err) {
      return console.log(err);
    }

    htmlData = htmlData
      .replace(/{{title}}/, `Xactimate Sketch Gallery: Sketching with Pre-Made Templates`)
      .replace("__META_OG_TITLE__", `Xactimate Sketch Gallery: Sketching with Pre-Made Templates`)
      .replace(
        "__META_OG_DESCRIPTION__",
        "Save time and improve accuracy in your Xactimate estimates using the Sketch Gallery on Actionable Insights. Learn how to access and use it. Read more."
      )
      .replace(
        "__META_DESCRIPTION__",
        "Save time and improve accuracy in your Xactimate estimates using the Sketch Gallery on Actionable Insights. Learn how to access and use it. Read more."
      )
      .replace(
        "__META_OG_IMAGE__",
        "https://getinsights2-data.s3.amazonaws.com/OG.png"
      )
      .replace(
        "__META_CAN__",
        ` ${("https" + "://" + req.get("host") + req.originalUrl).replace(
          "wwww.",
          ""
        )}`
      );
    return res.send(htmlData);
  });
});

//HolidaySeasonYourBestChanceToGetMatterportCertification

app.get("/blog/holiday-season-your-best-chance-to-get-matterport-certification", function (req, res) {
  const filePath = path.resolve(__dirname, "..", "build", "index.html");

  fs.readFile(filePath, "utf8", function (err, htmlData) {
    if (err) {
      return console.log(err);
    }

    htmlData = htmlData
      .replace(/{{title}}/, `Holiday season's your best chance to get Matterport Certification`)
      .replace("__META_OG_TITLE__", `Holiday season's your best chance to get Matterport Certifications`)
      .replace(
        "__META_OG_DESCRIPTION__",
        "Why the holiday season is ideal to get your Actionable Insights Matterport Certification & start the New Year with a competitive edge? Read more."
      )
      .replace(
        "__META_DESCRIPTION__",
        "Why the holiday season is ideal to get your Actionable Insights Matterport Certification & start the New Year with a competitive edge? Read more."
      )
      .replace(
        "__META_OG_IMAGE__",
        "https://getinsights2-data.s3.amazonaws.com/OG.png"
      )
      .replace(
        "__META_CAN__",
        ` ${("https" + "://" + req.get("host") + req.originalUrl).replace(
          "wwww.",
          ""
        )}`
      );
    return res.send(htmlData);
  });
});

//RequestingPriceListInX1

app.get("/blog/requesting-price-list-in-x1", function (req, res) {
  const filePath = path.resolve(__dirname, "..", "build", "index.html");

  fs.readFile(filePath, "utf8", function (err, htmlData) {
    if (err) {
      return console.log(err);
    }

    htmlData = htmlData
      .replace(/{{title}}/, `How to Request Xactimate Price Lists in X1 - Actionable Insights`)
      .replace("__META_OG_TITLE__", `How to Request Xactimate Price Lists in X1 - Actionable Insights`)
      .replace(
        "__META_OG_DESCRIPTION__",
        "What are Xactimate Price Lists? How can you request, download, and manage them in X1 to write accurate estimates? Check out this guide to learn more."
      )
      .replace(
        "__META_DESCRIPTION__",
        "What are Xactimate Price Lists? How can you request, download, and manage them in X1 to write accurate estimates? Check out this guide to learn more."
      )
      .replace(
        "__META_OG_IMAGE__",
        "https://getinsights2-data.s3.amazonaws.com/OG.png"
      )
      .replace(
        "__META_CAN__",
        ` ${("https" + "://" + req.get("host") + req.originalUrl).replace(
          "wwww.",
          ""
        )}`
      );
    return res.send(htmlData);
  });
});

//HowToCreateAFreeMatterportAccountForAPolicyHolder

app.get("/blog/how-to-create-a-free-matterport-account-for-a-policy-holder", function (req, res) {
  const filePath = path.resolve(__dirname, "..", "build", "index.html");

  fs.readFile(filePath, "utf8", function (err, htmlData) {
    if (err) {
      return console.log(err);
    }

    htmlData = htmlData
      .replace(/{{title}}/, `How to Create a Free Matterport Account for Policyholders?`)
      .replace("__META_OG_TITLE__", `How to Create a Free Matterport Account for Policyholders?`)
      .replace(
        "__META_OG_DESCRIPTION__",
        "A step-by-step guide to creating a free Matterport account for your policyholders and how it can positively impact your business. Read more to learn."
      )
      .replace(
        "__META_DESCRIPTION__",
        "A step-by-step guide to creating a free Matterport account for your policyholders and how it can positively impact your business. Read more to learn."
      )
      .replace(
        "__META_OG_IMAGE__",
        "https://getinsights2-data.s3.amazonaws.com/OG.png"
      )
      .replace(
        "__META_CAN__",
        ` ${("https" + "://" + req.get("host") + req.originalUrl).replace(
          "wwww.",
          ""
        )}`
      );
    return res.send(htmlData);
  });
});

//TruePlanIntegrationWithXactimate

app.get("/blog/trueplan-integration-with-xactimate", function (req, res) {
  const filePath = path.resolve(__dirname, "..", "build", "index.html");

  fs.readFile(filePath, "utf8", function (err, htmlData) {
    if (err) {
      return console.log(err);
    }

    htmlData = htmlData
      .replace(/{{title}}/, `Automate Sketches with Matterport TruePlan for Xactimate`)
      .replace("__META_OG_TITLE__", `Automate Sketches with Matterport TruePlan for Xactimate`)
      .replace(
        "__META_OG_DESCRIPTION__",
        "Learn to integrate Matterport TruePlan with Xactimate to save time, reduce errors, and improve efficiency with pre-built sketches. Read more."
      )
      .replace(
        "__META_DESCRIPTION__",
        "Learn to integrate Matterport TruePlan with Xactimate to save time, reduce errors, and improve efficiency with pre-built sketches. Read more."
      )
      .replace(
        "__META_OG_IMAGE__",
        "https://getinsights2-data.s3.amazonaws.com/OG.png"
      )
      .replace(
        "__META_CAN__",
        ` ${("https" + "://" + req.get("host") + req.originalUrl).replace(
          "wwww.",
          ""
        )}`
      );
    return res.send(htmlData);
  });
});

//LoggingInToX1AndSyncingProfiles

app.get("/blog/logging-in-to-x1-and-syncing-profiles", function (req, res) {
  const filePath = path.resolve(__dirname, "..", "build", "index.html");

  fs.readFile(filePath, "utf8", function (err, htmlData) {
    if (err) {
      return console.log(err);
    }

    htmlData = htmlData
      .replace(/{{title}}/, `How to Log In and Sync Profiles in Xactimate X1 | Actionable Insights | Resources for Xactimate & Matterport`)
      .replace("__META_OG_TITLE__", `How to Log In and Sync Profiles in Xactimate X1 | Actionable Insights | Resources for Xactimate & Matterport`)
      .replace(
        "__META_OG_DESCRIPTION__",
        "New to Xactimate X1? Learn how to log in to Xactimate X1 and sync essential profiles like the Actionable Profile in this guide. Read more now."
      )
      .replace(
        "__META_DESCRIPTION__",
        "New to Xactimate X1? Learn how to log in to Xactimate X1 and sync essential profiles like the Actionable Profile in this guide. Read more now."
      )
      .replace(
        "__META_OG_IMAGE__",
        "https://getinsights2-data.s3.amazonaws.com/OG.png"
      )
      .replace(
        "__META_CAN__",
        ` ${("https" + "://" + req.get("host") + req.originalUrl).replace(
          "wwww.",
          ""
        )}`
      );
    return res.send(htmlData);
  });
});

//HowToEditProjectNamesInXactimateX1

app.get("/blog/how-to-edit-project-names-in-xactimate-x1", function (req, res) {
  const filePath = path.resolve(__dirname, "..", "build", "index.html");

  fs.readFile(filePath, "utf8", function (err, htmlData) {
    if (err) {
      return console.log(err);
    }

    htmlData = htmlData
      .replace(/{{title}}/, `How to Edit Project Names in Xactimate X1 | http://Getinsights.org`)
      .replace("__META_OG_TITLE__", `How to Edit Project Names in Xactimate X1 | http://Getinsights.org`)
      .replace(
        "__META_OG_DESCRIPTION__",
        "Xactimate X1's interface is quite different fro X28. Learn to edit project names in Xactimate X1 with this step-by-step guide. Read more."
      )
      .replace(
        "__META_DESCRIPTION__",
        "Xactimate X1's interface is quite different fro X28. Learn to edit project names in Xactimate X1 with this step-by-step guide. Read more."
      )
      .replace(
        "__META_OG_IMAGE__",
        "https://getinsights2-data.s3.amazonaws.com/OG.png"
      )
      .replace(
        "__META_CAN__",
        ` ${("https" + "://" + req.get("host") + req.originalUrl).replace(
          "wwww.",
          ""
        )}`
      );
    return res.send(htmlData);
  });
});

//HowDoYouRequestANewAlertInTheActionableProfileForBetterXactimateEstimates

app.get("/blog/how-do-you-request-a-new-alert-in-the-actionable-profile-for-better-xactimate-estimates", function (req, res) {
  const filePath = path.resolve(__dirname, "..", "build", "index.html");

  fs.readFile(filePath, "utf8", function (err, htmlData) {
    if (err) {
      return console.log(err);
    }

    htmlData = htmlData
      .replace(/{{title}}/, `Requesting New Alerts in the Actionable Profile | http://Getinsights.org`)
      .replace("__META_OG_TITLE__", `Requesting New Alerts in the Actionable Profile | http://Getinsights.org`)
      .replace(
        "__META_OG_DESCRIPTION__",
        "The Actionable Profile provides live estimating guidance for Xactimate estimates. Learn how to request new alerts for accurate estimating. Read more."
      )
      .replace(
        "__META_DESCRIPTION__",
        "The Actionable Profile provides live estimating guidance for Xactimate estimates. Learn how to request new alerts for accurate estimating. Read more."
      )
      .replace(
        "__META_OG_IMAGE__",
        "https://getinsights2-data.s3.amazonaws.com/OG.png"
      )
      .replace(
        "__META_CAN__",
        ` ${("https" + "://" + req.get("host") + req.originalUrl).replace(
          "wwww.",
          ""
        )}`
      );
    return res.send(htmlData);
  });
});

//HowToExpandAndCollapseTheGuidanceProvidedWithinTheXactXpertDrawer

app.get("/blog/how-to-expand-and-collapse-the-guidance-provided-within-the-xactxpert-drawer", function (req, res) {
  const filePath = path.resolve(__dirname, "..", "build", "index.html");

  fs.readFile(filePath, "utf8", function (err, htmlData) {
    if (err) {
      return console.log(err);
    }

    htmlData = htmlData
      .replace(/{{title}}/, `How to Expand/Collapse Guidance in XactXpert | Getinsights.org`)
      .replace("__META_OG_TITLE__", `How to Expand/Collapse Guidance in XactXpert | Getinsights.org`)
      .replace(
        "__META_OG_DESCRIPTION__",
        "Learn how to expand/collapse guidance in the XactXpert Drawer for easier navigation and improved workflows. Read more now."
      )
      .replace(
        "__META_DESCRIPTION__",
        "Learn how to expand/collapse guidance in the XactXpert Drawer for easier navigation and improved workflows. Read more now."
      )
      .replace(
        "__META_OG_IMAGE__",
        "https://getinsights2-data.s3.amazonaws.com/OG.png"
      )
      .replace(
        "__META_CAN__",
        ` ${("https" + "://" + req.get("host") + req.originalUrl).replace(
          "wwww.",
          ""
        )}`
      );
    return res.send(htmlData);
  });
});

//Media Release

app.get("/media-release", function (req, res) {
  const filePath = path.resolve(__dirname, "..", "build", "index.html");

  fs.readFile(filePath, "utf8", function (err, htmlData) {
    if (err) {
      return console.log(err);
    }

    htmlData = htmlData
      .replace(/{{title}}/, `Media Release`)
      .replace("__META_OG_TITLE__", `Media Release`)
      .replace(
        "__META_OG_DESCRIPTION__",
        "View the latest news, announcements and media releases from Actionable Insights"
      )
      .replace(
        "__META_DESCRIPTION__",
        "View the latest news, announcements and media releases from Actionable Insights"
      )
      .replace(
        "__META_OG_IMAGE__",
        "https://getinsights2-data.s3.amazonaws.com/OG.png"
      )
      .replace(
        "__META_CAN__",
        ` ${("https" + "://" + req.get("host") + req.originalUrl).replace(
          "wwww.",
          ""
        )}`
      );
    return res.send(htmlData);
  });
});

//WhatOthersSay

app.get("/what-others-say", function (req, res) {
  const filePath = path.resolve(__dirname, "..", "build", "index.html");

  fs.readFile(filePath, "utf8", function (err, htmlData) {
    if (err) {
      return console.log(err);
    }

    htmlData = htmlData
      .replace(/{{title}}/, `What Other's Say - Actionable Insights`)
      .replace("__META_OG_TITLE__", `What Other's Say - Actionable Insights`)
      .replace(
        "__META_OG_DESCRIPTION__",
        "Actionable Insights' leadership comprises of restoration industry leaders. That's why they're giving back to the industry they've been a part of for so long. - (This is what we do it for guys! Our leadership is comprised of experienced industry leaders that are indebted to an industry that has treated them exceeding)"
      )
      .replace(
        "__META_DESCRIPTION__",
        "Actionable Insights' leadership comprises of restoration industry leaders. That's why they're giving back to the industry they've been a part of for so long. - (This is what we do it for guys! Our leadership is comprised of experienced industry leaders that are indebted to an industry that has treated them exceeding)"
      )
      .replace(
        "__META_OG_IMAGE__",
        "https://getinsights2-data.s3.amazonaws.com/OG.png"
      )
      .replace(
        "__META_CAN__",
        ` ${("https" + "://" + req.get("host") + req.originalUrl).replace(
          "wwww.",
          ""
        )}`
      );
    return res.send(htmlData);
  });
});

//enterprisegiftcards

app.get("/resources/gift-cards/enterprise-gift-cards", function (req, res) {
  const filePath = path.resolve(__dirname, "..", "build", "index.html");

  fs.readFile(filePath, "utf8", function (err, htmlData) {
    if (err) {
      return console.log(err);
    }

    htmlData = htmlData
      .replace(/{{title}}/, `Enterprise Gift Cards - Actionable Insights`)
      .replace(
        "__META_OG_TITLE__",
        `Enterprise Gift Cards - Actionable Insights`
      )
      .replace(
        "__META_OG_DESCRIPTION__",
        "A customized way to say thanks to those in your network! Give them the gift of the Insight Sheet Database, Macros and much more."
      )
      .replace(
        "__META_DESCRIPTION__",
        "A customized way to say thanks to those in your network! Give them the gift of the Insight Sheet Database, Macros and much more."
      )
      .replace(
        "__META_OG_IMAGE__",
        "https://getinsights2-data.s3.amazonaws.com/OG.png"
      )
      .replace(
        "__META_CAN__",
        ` ${("https" + "://" + req.get("host") + req.originalUrl).replace(
          "wwww.",
          ""
        )}`
      );
    return res.send(htmlData);
  });
});

//3DTraining

app.get("/resources/3d-training-modules", function (req, res) {
  const filePath = path.resolve(__dirname, "..", "build", "index.html");

  fs.readFile(filePath, "utf8", function (err, htmlData) {
    if (err) {
      return console.log(err);
    }

    htmlData = htmlData
      .replace(/{{title}}/, `3D Training Modules - Actionable Insights`)
      .replace("__META_OG_TITLE__", `3D Training Modules - Actionable Insights`)
      .replace(
        "__META_OG_DESCRIPTION__",
        "Actionable Insights has taken Xactimate estimating training to the next level. We train off of real-life losses captured by Matterport’s technology."
      )
      .replace(
        "__META_DESCRIPTION__",
        "Actionable Insights has taken Xactimate estimating training to the next level. We train off of real-life losses captured by Matterport’s technology."
      )
      .replace(
        "__META_OG_IMAGE__",
        "https://getinsights2-data.s3.amazonaws.com/OG.png"
      )
      .replace(
        "__META_CAN__",
        ` ${("https" + "://" + req.get("host") + req.originalUrl).replace(
          "wwww.",
          ""
        )}`
      );
    return res.send(htmlData);
  });
});

//AITC

app.get("/aitc", function (req, res) {
  const filePath = path.resolve(__dirname, "..", "build", "index.html");

  fs.readFile(filePath, "utf8", function (err, htmlData) {
    if (err) {
      return console.log(err);
    }

    htmlData = htmlData
      .replace(/{{title}}/, `AITC - Actionable Insights`)
      .replace("__META_OG_TITLE__", `AITC - Actionable Insights`)
      .replace(
        "__META_OG_DESCRIPTION__",
        "The Actionable Insights Tools Certification course will walk you through the AI Resources"
      )
      .replace(
        "__META_DESCRIPTION__",
        "The Actionable Insights Tools Certification course will walk you through the AI Resources"
      )
      .replace(
        "__META_OG_IMAGE__",
        "https://getinsights2-data.s3.amazonaws.com/OG.png"
      )
      .replace(
        "__META_CAN__",
        ` ${("https" + "://" + req.get("host") + req.originalUrl).replace(
          "wwww.",
          ""
        )}`
      );
    return res.send(htmlData);
  });
});

//AIMC

app.get("/aimc", function (req, res) {
  const filePath = path.resolve(__dirname, "..", "build", "index.html");

  fs.readFile(filePath, "utf8", function (err, htmlData) {
    if (err) {
      return console.log(err);
    }

    htmlData = htmlData
      .replace(/{{title}}/, `Become AI Matterport Certified with Actionable Insights`)
      .replace("__META_OG_TITLE__", `Become AI Matterport Certified with Actionable Insights`)
      .replace(
        "__META_OG_DESCRIPTION__",
        "Actionable Insights Matterport Certification is an industry-recognized course to help you use Matterport to the fullest. Register now."
      )
      .replace(
        "__META_DESCRIPTION__",
        "Actionable Insights Matterport Certification is an industry-recognized course to help you use Matterport to the fullest. Register now."
      )
      .replace(
        "__META_OG_IMAGE__",
        "https://getinsights2-data.s3.amazonaws.com/OG.png"
      )
      .replace(
        "__META_CAN__",
        ` ${("https" + "://" + req.get("host") + req.originalUrl).replace(
          "wwww.",
          ""
        )}`
      );
    return res.send(htmlData);
  });
});

//PRICELISTUPDATE

app.get("/resources/price-list-update-summary/", function (req, res) {
  const filePath = path.resolve(__dirname, "..", "build", "index.html");

  fs.readFile(filePath, "utf8", function (err, htmlData) {
    if (err) {
      return console.log(err);
    }

    htmlData = htmlData
      .replace(/{{title}}/, `Price List Update Summary | Stay Tuned to Latest Xactimate Prices`)
      .replace(
        "__META_OG_TITLE__",
        `Price List Update Summary | Stay Tuned to Latest Xactimate Prices`
      )
      .replace(
        "__META_OG_DESCRIPTION__",
        "Check out our free Price List Update Summary covering all the changes in the Xactimate price list, the addition of new line items, and much more."
      )
      .replace(
        "__META_DESCRIPTION__",
        "Check out our free Price List Update Summary covering all the changes in the Xactimate price list, the addition of new line items, and much more."
      )
      .replace(
        "__META_OG_IMAGE__",
        "https://getinsights2-data.s3.amazonaws.com/OG.png"
      )
      .replace(
        "__META_CAN__",
        ` ${("https" + "://" + req.get("host") + req.originalUrl).replace(
          "wwww.",
          ""
        )}`
      );
    return res.send(htmlData);
  });
});

app.get("/resources/price-list-update-summary/*", function (req, res) {
  const filePath = path.resolve(__dirname, "..", "build", "index.html");

  fs.readFile(filePath, "utf8", function (err, htmlData) {
    if (err) {
      return console.log(err);
    }

    const pricePermalink = req.path
      .replace("/resources/price-list-update-summary/", "")
      .replace(/\/$/, "");
    getPriceListByPermalink = (permalink) => {
      axios
        .post(
          `${appConfig[req.hostname]}:${
            appConfig.serverPort
          }/${"Public"}/GetPriceListUpdateSummaryByPermalink?permalink=${permalink}`
        )
        .then((ress) => {
          if (ress.data.Requested_Action === false) {
            return res.status(404).send(htmlData);
          } else {
            htmlData = htmlData
              .replace(
                /{{title}}/,
                ress.data
                  ? ress.data.data.metatitle
                    ? ress.data.data.metatitle
                    : ress.data.data.tabtitle
                    ? ress.data.data.tabtitle
                    : `Price List Update Summary - Actionable Insights`
                  : `Price List Update Summary - Actionable Insights`
              )
              .replace(
                "__META_OG_TITLE__",
                ress.data
                  ? ress.data.data.metatitle
                    ? ress.data.data.metatitle
                    : ress.data.data.tabtitle
                    ? ress.data.data.tabtitle
                    : `Price List Update Summary - Actionable Insights`
                  : `Price List Update Summary - Actionable Insights`
              )
              .replace(
                "__META_OG_DESCRIPTION__",
                ress.data.data.metadescription
                  ? ress.data.data.metadescription
                  : "Explore what new Xactimate line items were added to the Price List. This list is updated monthly so that you don’t have to go through the trouble to find out on your own."
              )
              .replace(
                "__META_DESCRIPTION__",
                ress.data.data.metadescription
                  ? ress.data.data.metadescription
                  : "Explore what new Xactimate line items were added to the Price List. This list is updated monthly so that you don’t have to go through the trouble to find out on your own."
              )
              .replace(
                "__META_OG_IMAGE__",
                ress.data.data.facebookogimage
                  ? ress.data.data.facebookogimage
                  : "https://getinsights2-data.s3.amazonaws.com/OG.png"
              )
              .replace(
                "__META_CAN__",
                ` ${(
                  "https" +
                  "://" +
                  req.get("host") +
                  req.originalUrl
                ).replace("wwww.", "")}`
              );
            return res.send(htmlData);
          }
        })
        .catch((error) => {
          console.error(error);
        });
    };

    getPriceListByPermalink(pricePermalink);
  });
});

//cOMMONLYoVERLOOKEDiTEMS

app.get("/commonly-overlooked-line-items", function (req, res) {
  const filePath = path.resolve(__dirname, "..", "build", "index.html");

  fs.readFile(filePath, "utf8", function (err, htmlData) {
    if (err) {
      return console.log(err);
    }

    htmlData = htmlData
      .replace(
        /{{title}}/,
        `Commonly Overlooked Line Items in Xactimate - Actionable Insights`
      )
      .replace(
        "__META_OG_TITLE__",
        "Commonly Overlooked Line Items in Xactimate - Actionable Insights"
      )
      .replace(
        "__META_OG_DESCRIPTION__",
        "Database of Xactimate line items that are frequently warranted but consistently overlooked in estimates so you never miss them again. Explore now."
      )
      .replace(
        "__META_DESCRIPTION__",
        "Database of Xactimate line items that are frequently warranted but consistently overlooked in estimates so you never miss them again. Explore now.."
      )
      .replace(
        "__META_OG_IMAGE__",
        "https://getinsights2-data.s3.amazonaws.com/OG.png"
      )
      .replace(
        "__META_CAN__",
        ` ${("https" + "://" + req.get("host") + req.originalUrl).replace(
          "wwww.",
          ""
        )}`
      );
    return res.send(htmlData);
  });
});

//InsightsheetTutorial

app.get("/insight-sheet-tutorial", function (req, res) {
  const filePath = path.resolve(__dirname, "..", "build", "index.html");

  fs.readFile(filePath, "utf8", function (err, htmlData) {
    if (err) {
      return console.log(err);
    }

    htmlData = htmlData
      .replace(/{{title}}/, `Insight Sheet Tutorial - Actionable Insights`)
      .replace(
        "__META_OG_TITLE__",
        "Insight Sheet Tutorial - Actionable Insights"
      )
      .replace(
        "__META_OG_DESCRIPTION__",
        "Watch this tutorial to explore and dissect the various elements associated with an Insight Sheet "
      )
      .replace(
        "__META_DESCRIPTION__",
        "Watch this tutorial to explore and dissect the various elements associated with an Insight Sheet "
      )
      .replace(
        "__META_OG_IMAGE__",
        "https://getinsights2-data.s3.amazonaws.com/OG.png"
      )
      .replace(
        "__META_CAN__",
        ` ${("https" + "://" + req.get("host") + req.originalUrl).replace(
          "wwww.",
          ""
        )}`
      );
    return res.send(htmlData);
  });
});

//Matterport Standards

app.get("/matterport-standards", function (req, res) {
  const filePath = path.resolve(__dirname, "..", "build", "index.html");

  fs.readFile(filePath, "utf8", function (err, htmlData) {
    if (err) {
      return console.log(err);
    }

    htmlData = htmlData
      .replace(
        /{{title}}/,
        `Matterport Restoration Industry Standards - Actionable Insights`
      )
      .replace(
        "__META_OG_TITLE__",
        "Matterport Restoration Industry Standards - Actionable Insights"
      )
      .replace(
        "__META_OG_DESCRIPTION__",
        "If there's one guide that tells you everything you need to know about Matterport's standard equipment, terminology, add-ons, etc. This is it. Read now."
      )
      .replace(
        "__META_DESCRIPTION__",
        "If there's one guide that tells you everything you need to know about Matterport's standard equipment, terminology, add-ons, etc. This is it. Read now."
      )
      .replace(
        "__META_OG_IMAGE__",
        "https://getinsights2-data.s3.amazonaws.com/OG.png"
      )
      .replace(
        "__META_CAN__",
        ` ${("https" + "://" + req.get("host") + req.originalUrl).replace(
          "wwww.",
          ""
        )}`
      );
    return res.send(htmlData);
  });
});

//Demo

app.get("/demo", function (req, res) {
  const filePath = path.resolve(__dirname, "..", "build", "index.html");

  fs.readFile(filePath, "utf8", function (err, htmlData) {
    if (err) {
      return console.log(err);
    }

    htmlData = htmlData
      .replace(/{{title}}/, ` Demo - Actionable Insights`)
      .replace("__META_OG_TITLE__", "Demo - Actionable Insights")
      .replace(
        "__META_OG_DESCRIPTION__",
        "Get a glimpse of how Actionable Insights enables contractors and adjusters by providing resources and digital assets they can leverage."
      )
      .replace(
        "__META_DESCRIPTION__",
        "Get a glimpse of how Actionable Insights enables contractors and adjusters by providing resources and digital assets they can leverage."
      )
      .replace(
        "__META_OG_IMAGE__",
        "https://getinsights2-data.s3.amazonaws.com/OG.png"
      )
      .replace(
        "__META_CAN__",
        ` ${("https" + "://" + req.get("host") + req.originalUrl).replace(
          "wwww.",
          ""
        )}`
      );
    return res.send(htmlData);
  });
});

//InsighterReport

app.get("/resources/insighter-report", function (req, res) {
  const filePath = path.resolve(__dirname, "..", "build", "index.html");

  fs.readFile(filePath, "utf8", function (err, htmlData) {
    if (err) {
      return console.log(err);
    }

    htmlData = htmlData
      .replace(/{{title}}/, `Insighter Report | A resource library by Actionable Insights`)
      .replace("__META_OG_TITLE__", "Insighter Report | A resource library by Actionable Insights")
      .replace(
        "__META_OG_DESCRIPTION__",
        "Our Insighter Report contains resources for restoration and claims professionals including industry news, white papers, and more. Check it out."
      )
      .replace(
        "__META_DESCRIPTION__",
        "Our Insighter Report contains resources for restoration and claims professionals including industry news, white papers, and more. Check it out."
      )
      .replace(
        "__META_OG_IMAGE__",
        "https://getinsights2-data.s3.amazonaws.com/OG.png"
      )
      .replace(
        "__META_CAN__",
        ` ${("https" + "://" + req.get("host") + req.originalUrl).replace(
          "wwww.",
          ""
        )}`
      );
    return res.send(htmlData);
  });
});

app.get("/resources/insighter-report/*", function (req, res) {
  const filePath = path.resolve(__dirname, "..", "build", "index.html");

  fs.readFile(filePath, "utf8", function (err, htmlData) {
    if (err) {
      return console.log(err);
    }

    const insighterReportPermalink = req.path
      .replace("/resources/insighter-report/", "")
      .replace(/\/$/, "");
    getInsighterReportByPermalink = (permalink) => {
      axios
        .post(
          `${appConfig[req.hostname]}:${
            appConfig.serverPort
          }/${"Public"}/GetAllPriceInsighterReports`
        )
        .then((ress) => {
          const data = ress.data.data.filter(
            (insighterreport) => insighterreport.permalink === permalink
          )[0];

          console.log(permalink);
          if (ress.data.Requested_Action === false || !data) {
            return res.status(404).send(htmlData);
          } else {
            htmlData = htmlData
              .replace(
                /{{title}}/,
                data
                  ? data.metatitle
                    ? data.metatitle
                    : data.tabtitle
                    ? data.tabtitle
                    : "Insighter Report - Actionable Insights"
                  : "Insighter Report - Actionable Insights"
              )
              .replace(
                "__META_OG_TITLE__",
                data
                  ? data.metatitle
                    ? data.metatitle
                    : data.tabtitle
                    ? data.tabtitle
                    : "Insighter Report - Actionable Insights"
                  : "Insighter Report - Actionable Insights"
              )
              .replace(
                "__META_OG_DESCRIPTION__",
                data.metadescription
                  ? data.metadescription
                  : data.featureddescription
                  ? data.featureddescription
                  : "Explore Insighter Reporter by Actionable Inights, a resource library for restoration and claims professionals. Read up on all the latest info in the industry."
              )
              .replace(
                "__META_DESCRIPTION__",
                data.metadescription
                  ? data.metadescription
                  : data.featureddescription
                  ? data.featureddescription
                  : "Explore Insighter Reporter by Actionable Inights, a resource library for restoration and claims professionals. Read up on all the latest info in the industry."
              )
              .replace(
                "__META_OG_IMAGE__",
                ress.data.data.facebookogimage
                  ? ress.data.data.facebookogimage
                  : "https://getinsights2-data.s3.amazonaws.com/OG.png"
              )
              .replace(
                "__META_CAN__",
                ` ${(
                  "https" +
                  "://" +
                  req.get("host") +
                  req.originalUrl
                ).replace("wwww.", "")}`
              );
            return res.send(htmlData);
          }
        })
        .catch((error) => {
          console.error(error);
        });
    };

    getInsighterReportByPermalink(insighterReportPermalink);
  });
});

//search

app.get("/search", function (req, res) {
  const filePath = path.resolve(__dirname, "..", "build", "index.html");

  fs.readFile(filePath, "utf8", function (err, htmlData) {
    if (err) {
      return console.log(err);
    }

    htmlData = htmlData
      .replace(/{{title}}/, `Global Search - Actionable Insights`)
      .replace("__META_OG_TITLE__", `Global Search - Actionable Insights`)
      .replace(
        "__META_OG_DESCRIPTION__",
        "Search across all Actionable Insights resources to find results from Insight Sheets, Insighter Reports, Price List Update Summary videos/articles, and more!"
      )
      .replace(
        "__META_DESCRIPTION__",
        "Search across all Actionable Insights resources to find results from Insight Sheets, Insighter Reports, Price List Update Summary videos/articles, and more!"
      )
      .replace(
        "__META_OG_IMAGE__",
        "https://getinsights2-data.s3.amazonaws.com/OG.png"
      )
      .replace(
        "__META_CAN__",
        ` ${("https" + "://" + req.get("host") + req.originalUrl).replace(
          "wwww.",
          ""
        )}`
      );
    return res.send(htmlData);
  });
});

//SolidafiTermsAndConditions

app.get("/terms-and-conditions-solidifai", function (req, res) {
  const filePath = path.resolve(__dirname, "..", "build", "index.html");

  fs.readFile(filePath, "utf8", function (err, htmlData) {
    if (err) {
      return console.log(err);
    }

    htmlData = htmlData
      .replace(
        /{{title}}/,
        `Solidifai - Terms and Conditions - Actionable Insights`
      )
      .replace(
        "__META_OG_TITLE__",
        "Solidifai - Terms and Conditions - Actionable Insights"
      )
      .replace(
        "__META_OG_DESCRIPTION__",
        `As Actionable Insights estimate edit engine Solidifai® is trademarked by us and terms and conditions apply for the utility of this service. - (DEFINITIONS As used in this Agreement, the terms below shall have the following meanings: "Licensed Product" shall mean access to Solidifai. “Solidifai” sha)`
      )
      .replace(
        "__META_DESCRIPTION__",
        `As Actionable Insights estimate edit engine Solidifai® is trademarked by us and terms and conditions apply for the utility of this service. - (DEFINITIONS As used in this Agreement, the terms below shall have the following meanings: "Licensed Product" shall mean access to Solidifai. “Solidifai” sha)`
      )
      .replace(
        "__META_OG_IMAGE__",
        "https://getinsights2-data.s3.amazonaws.com/OG.png"
      )
      .replace(
        "__META_CAN__",
        ` ${("https" + "://" + req.get("host") + req.originalUrl).replace(
          "wwww.",
          ""
        )}`
      );
    return res.send(htmlData);
  });
});

//TermsAndConditions

app.get("/terms-and-conditions", function (req, res) {
  const filePath = path.resolve(__dirname, "..", "build", "index.html");

  fs.readFile(filePath, "utf8", function (err, htmlData) {
    if (err) {
      return console.log(err);
    }

    htmlData = htmlData
      .replace(/{{title}}/, `Terms and Conditions - Actionable Insights`)
      .replace(
        "__META_OG_TITLE__",
        "Terms and Conditions - Actionable Insights"
      )
      .replace(
        "__META_OG_DESCRIPTION__",
        "Here are the Terms & Conditions that apply when you use the Actionable Insights Forum. We are strongly committed to respecting and protecting your privacy."
      )
      .replace(
        "__META_DESCRIPTION__",
        "Here are the Terms & Conditions that apply when you use the Actionable Insights Forum. We are strongly committed to respecting and protecting your privacy."
      )
      .replace(
        "__META_OG_IMAGE__",
        "https://getinsights2-data.s3.amazonaws.com/OG.png"
      )
      .replace(
        "__META_CAN__",
        ` ${("https" + "://" + req.get("host") + req.originalUrl).replace(
          "wwww.",
          ""
        )}`
      );
    return res.send(htmlData);
  });
});

//PlanMatrix

app.get("/plan-matrix", function (req, res) {
  const filePath = path.resolve(__dirname, "..", "build", "index.html");

  fs.readFile(filePath, "utf8", function (err, htmlData) {
    if (err) {
      return console.log(err);
    }

    htmlData = htmlData
      .replace(/{{title}}/, `Plan Matrix - Actionable Insights`)
      .replace("__META_OG_TITLE__", `Plan Matrix - Actionable Insights`)
      .replace(
        "__META_OG_DESCRIPTION__",
        "Explore all the plans Actionable Insights has to offer and what perks come with each plan. Figure out which membership plan works for you and your business."
      )
      .replace(
        "__META_DESCRIPTION__",
        "Explore all the plans Actionable Insights has to offer and what perks come with each plan. Figure out which membership plan works for you and your business."
      )
      .replace(
        "__META_OG_IMAGE__",
        "https://getinsights2-data.s3.amazonaws.com/OG.png"
      )
      .replace(
        "__META_CAN__",
        ` ${("https" + "://" + req.get("host") + req.originalUrl).replace(
          "wwww.",
          ""
        )}`
      );
    return res.send(htmlData);
  });
});

//EnterprisePlan

app.get("/enterprise-membership", function (req, res) {
  const filePath = path.resolve(__dirname, "..", "build", "index.html");

  fs.readFile(filePath, "utf8", function (err, htmlData) {
    if (err) {
      return console.log(err);
    }

    htmlData = htmlData
      .replace(
        /{{title}}/,
        `Enterprise Membership Plan | Organizations that need enterprise-grade features, scale, reporting and support.`
      )
      .replace(
        "__META_OG_TITLE__",
        `Enterprise Membership Plan | Organizations that need enterprise-grade features, scale, reporting and support.`
      )
      .replace(
        "__META_OG_DESCRIPTION__",
        `Upgrade to our Enterprise Membership Plan on [getInsights.org](https://GetInsights.org "‌"). Tailored to fit large organization needs, our plan offers enterprise-grade features, scale, reporting and support.`
      )
      .replace(
        "__META_DESCRIPTION__",
        `Upgrade to our Enterprise Membership Plan on [getInsights.org](https://GetInsights.org "‌"). Tailored to fit large organization needs, our plan offers enterprise-grade features, scale, reporting and support.`
      )
      .replace(
        "__META_OG_IMAGE__",
        "https://getinsights2-data.s3.amazonaws.com/OG.png"
      )
      .replace(
        "__META_CAN__",
        ` ${("https" + "://" + req.get("host") + req.originalUrl).replace(
          "wwww.",
          ""
        )}`
      );
    return res.send(htmlData);
  });
});

//umpire manual

app.get(
  "/actionable-insights-mitigation-and-repair-manual",
  function (req, res) {
    const filePath = path.resolve(__dirname, "..", "build", "index.html");

    fs.readFile(filePath, "utf8", function (err, htmlData) {
      if (err) {
        return console.log(err);
      }

      htmlData = htmlData
        .replace(/{{title}}/, `Umpire Manuals - Actionable Insights`)
        .replace("__META_OG_TITLE__", `Umpire Manuals - Actionable Insights`)
        .replace(
          "__META_OG_DESCRIPTION__",
          "Write your notes in the margins, highlight and add post-its notes 'till your heart's content."
        )
        .replace(
          "__META_DESCRIPTION__",
          "Write your notes in the margins, highlight and add post-its notes 'till your heart's content."
        )
        .replace(
          "__META_OG_IMAGE__",
          "https://getinsights2-data.s3.amazonaws.com/OG.png"
        )
        .replace(
          "__META_CAN__",
          ` ${("https" + "://" + req.get("host") + req.originalUrl).replace(
            "wwww.",
            ""
          )}`
        );
      return res.send(htmlData);
    });
  }
);

//Ownership

app.get("/gi-ownership", function (req, res) {
  const filePath = path.resolve(__dirname, "..", "build", "index.html");

  fs.readFile(filePath, "utf8", function (err, htmlData) {
    if (err) {
      return console.log(err);
    }

    htmlData = htmlData
      .replace(/{{title}}/, `Ownership - Actionable Insights `)
      .replace("__META_OG_TITLE__", `Ownership - Actionable Insights `)
      .replace(
        "__META_OG_DESCRIPTION__",
        "We are proud to say we do not know this person. There are a few Actionable Insights out there, and we’ve been tagged and emailed numerous times in the past confusing us with Jason Wood’s company."
      )
      .replace(
        "__META_DESCRIPTION__",
        "We are proud to say we do not know this person. There are a few Actionable Insights out there, and we’ve been tagged and emailed numerous times in the past confusing us with Jason Wood’s company."
      )
      .replace(
        "__META_OG_IMAGE__",
        "https://getinsights2-data.s3.amazonaws.com/OG.png"
      )
      .replace(
        "__META_CAN__",
        ` ${("https" + "://" + req.get("host") + req.originalUrl).replace(
          "wwww.",
          ""
        )}`
      );
    return res.send(htmlData);
  });
});
//aimc-ce

app.get("/aimc-ce", function (req, res) {
  const filePath = path.resolve(__dirname, "..", "build", "index.html");

  fs.readFile(filePath, "utf8", function (err, htmlData) {
    if (err) {
      return console.log(err);
    }

    htmlData = htmlData
      .replace(
        /{{title}}/,
        `AIMC CONTINUING EDUCATION
        - Actionable Insights`
      )
      .replace("__META_OG_TITLE__", ` AIMC CONTINUING EDUCATION`)
      .replace(
        "__META_OG_DESCRIPTION__",
        "This course will explore all of the new concepts and strategies, and is specifically designed for the challengers and graduates of previous AIMC courses"
      )
      .replace(
        "__META_DESCRIPTION__",
        "This course will explore all of the new concepts and strategies, and is specifically designed for the challengers and graduates of previous AIMC courses"
      )
      .replace(
        "__META_OG_IMAGE__",
        "https://getinsights2-data.s3.amazonaws.com/OG.png"
      )
      .replace(
        "__META_CAN__",
        ` ${("https" + "://" + req.get("host") + req.originalUrl).replace(
          "wwww.",
          ""
        )}`
      );
    return res.send(htmlData);
  });
});

//StateLife

app.get("/state-insurance-license-reciprocity", function (req, res) {
  const filePath = path.resolve(__dirname, "..", "build", "index.html");

  fs.readFile(filePath, "utf8", function (err, htmlData) {
    if (err) {
      return console.log(err);
    }

    htmlData = htmlData
      .replace(
        /{{title}}/,
        `State Insurance License Reciprocity | Actionable Insights`
      )
      .replace(
        "__META_OG_TITLE__",
        `State Insurance License Reciprocity | Actionable Insights`
      )
      .replace(
        "__META_OG_DESCRIPTION__",
        "What is insurance license reciprocity and how do you leverage it? Learn everything you need to know with our helpful guide. Read more now."
      )
      .replace(
        "__META_DESCRIPTION__",
        "What is insurance license reciprocity and how do you leverage it? Learn everything you need to know with our helpful guide. Read more now."
      )
      .replace(
        "__META_OG_IMAGE__",
        "https://getinsights2-data.s3.amazonaws.com/OG.png"
      )
      .replace(
        "__META_CAN__",
        ` ${("https" + "://" + req.get("host") + req.originalUrl).replace(
          "wwww.",
          ""
        )}`
      );
    return res.send(htmlData);
  });
});

//GraduatesPublicRegistry

app.get("/aimc-graduates-public-registry", function (req, res) {
  const filePath = path.resolve(__dirname, "..", "build", "index.html");

  fs.readFile(filePath, "utf8", function (err, htmlData) {
    if (err) {
      return console.log(err);
    }

    htmlData = htmlData
      .replace(
        /{{title}}/,
        `Actionable Insights Matterport Certified Graduates Registry`
      )
      .replace(
        "__META_OG_TITLE__",
        `Actionable Insights Matterport Certified Graduates Registry`
      )
      .replace(
        "__META_OG_DESCRIPTION__",
        "Actionable Insights' publicly available database of every Matterport Certified Graduate to date. Verify the certification of any graduate here."
      )
      .replace(
        "__META_DESCRIPTION__",
        "Actionable Insights' publicly available database of every Matterport Certified Graduate to date. Verify the certification of any graduate here."
      )
      .replace(
        "__META_OG_IMAGE__",
        "https://getinsights2-data.s3.amazonaws.com/OG.png"
      )
      .replace(
        "__META_CAN__",
        ` ${("https" + "://" + req.get("host") + req.originalUrl).replace(
          "wwww.",
          ""
        )}`
      );
    return res.send(htmlData);
  });
});

//REFUND

app.get("/aimc-refund-policy", function (req, res) {
  const filePath = path.resolve(__dirname, "..", "build", "index.html");

  fs.readFile(filePath, "utf8", function (err, htmlData) {
    if (err) {
      return console.log(err);
    }

    htmlData = htmlData
      .replace(/{{title}}/, `AIMC Refund Policy  - Actionable Insights`)
      .replace("__META_OG_TITLE__", `AIMC Refund Policy  - Actionable Insights`)
      .replace(
        "__META_OG_DESCRIPTION__",
        "If you change your mind and no longer want to attend the course, you can email us at support@getinsights.org to request a refund."
      )
      .replace(
        "__META_DESCRIPTION__",
        "If you change your mind and no longer want to attend the course, you can email us at support@getinsights.org to request a refund."
      )
      .replace(
        "__META_OG_IMAGE__",
        "https://getinsights2-data.s3.amazonaws.com/OG.png"
      )
      .replace(
        "__META_CAN__",
        ` ${("https" + "://" + req.get("host") + req.originalUrl).replace(
          "wwww.",
          ""
        )}`
      );
    return res.send(htmlData);
  });
});

//tRAINING

app.get("/private-training", function (req, res) {
  const filePath = path.resolve(__dirname, "..", "build", "index.html");

  fs.readFile(filePath, "utf8", function (err, htmlData) {
    if (err) {
      return console.log(err);
    }

    htmlData = htmlData
      .replace(/{{title}}/, `Private Xactimate and Matterport Training | Actionable Insights`)
      .replace("__META_OG_TITLE__", `Private Xactimate and Matterport Training | Actionable Insights`)
      .replace(
        "__META_OG_DESCRIPTION__",
        "As Matterport's preffered training partner & having a staff full of Xactimate Certified Trainers, we offer on-demand private Xactimate & Matterport Training. Explore more."
      )
      .replace(
        "__META_DESCRIPTION__",
        "As Matterport's preffered training partner & having a staff full of Xactimate Certified Trainers, we offer on-demand private Xactimate & Matterport Training. Explore more."
      )
      .replace(
        "__META_OG_IMAGE__",
        "https://getinsights2-data.s3.amazonaws.com/OG.png"
      )
      .replace(
        "__META_CAN__",
        ` ${("https" + "://" + req.get("host") + req.originalUrl).replace(
          "wwww.",
          ""
        )}`
      );
    return res.send(htmlData);
  });
});

//LINEITEMREQUEST

app.get("/advance-the-cause/line-item-request", function (req, res) {
  const filePath = path.resolve(__dirname, "..", "build", "index.html");

  fs.readFile(filePath, "utf8", function (err, htmlData) {
    if (err) {
      return console.log(err);
    }

    htmlData = htmlData
      .replace(
        /{{title}}/,
        `Line Item Request | Let's speak for new Xactimate Line items`
      )
      .replace(
        "__META_OG_TITLE__",
        `Line Item Request | Let's speak for new Xactimate Line itemss`
      )
      .replace(
        "__META_OG_DESCRIPTION__",
        "We work closely with Verisk to vouch for new line items to be added in Xactimate based on your feedback. Fill out this form to share your perspective."
      )
      .replace(
        "__META_DESCRIPTION__",
        "We work closely with Verisk to vouch for new line items to be added in Xactimate based on your feedback. Fill out this form to share your perspective."
      )
      .replace(
        "__META_OG_IMAGE__",
        "https://getinsights2-data.s3.amazonaws.com/OG.png"
      )
      .replace(
        "__META_CAN__",
        ` ${("https" + "://" + req.get("host") + req.originalUrl).replace(
          "wwww.",
          ""
        )}`
      );
    return res.send(htmlData);
  });
});

//LINEITEMREQUEST

app.get(
  "/advance-the-cause/line-item-request/line-item-request-form",
  function (req, res) {
    const filePath = path.resolve(__dirname, "..", "build", "index.html");

    fs.readFile(filePath, "utf8", function (err, htmlData) {
      if (err) {
        return console.log(err);
      }

      htmlData = htmlData
        .replace(/{{title}}/, `Line Item Request Form  - Actionable Insights`)
        .replace(
          "__META_OG_TITLE__",
          `Line Item Request Form  - Actionable Insights`
        )
        .replace(
          "__META_OG_DESCRIPTION__",
          "Learn what happens when you submit your Line Item recommendation to Actionable Insights. How it is determined to be a credible and warranted addition. - (ACTIONABLE INSIGHTS CODE OF ETHICS. I care deeply about the restoration ecosystem. I intend to be a good steward of the restoration ecosystem. I intend to give more to the restoration ecosystem than I take away. I intend to strive for mastery, …)"
        )
        .replace(
          "__META_DESCRIPTION__",
          "Learn what happens when you submit your Line Item recommendation to Actionable Insights. How it is determined to be a credible and warranted addition. - (ACTIONABLE INSIGHTS CODE OF ETHICS. I care deeply about the restoration ecosystem. I intend to be a good steward of the restoration ecosystem. I intend to give more to the restoration ecosystem than I take away. I intend to strive for mastery, …)"
        )
        .replace(
          "__META_OG_IMAGE__",
          "https://getinsights2-data.s3.amazonaws.com/OG.png"
        )
        .replace(
          "__META_CAN__",
          ` ${("https" + "://" + req.get("host") + req.originalUrl).replace(
            "wwww.",
            ""
          )}`
        );
      return res.send(htmlData);
    });
  }
);

//MatterportFeature

app.get("/advance-the-cause/matterport-feature-request", function (req, res) {
  const filePath = path.resolve(__dirname, "..", "build", "index.html");

  fs.readFile(filePath, "utf8", function (err, htmlData) {
    if (err) {
      return console.log(err);
    }

    htmlData = htmlData
      .replace(/{{title}}/, `Matterport Feature Request | What do you wanna see in the future`)
      .replace(
        "__META_OG_TITLE__",
        `Matterport Feature Request | What do you wanna see in the future`
      )
      .replace(
        "__META_OG_DESCRIPTION__",
        "As Matterport’s training and support partner, Actionable Insights will support your voice for future updates you want to see. Submit your form."
      )
      .replace(
        "__META_DESCRIPTION__",
        "As Matterport’s training and support partner, Actionable Insights will support your voice for future updates you want to see. Submit your form."
      )
      .replace(
        "__META_OG_IMAGE__",
        "https://getinsights2-data.s3.amazonaws.com/OG.png"
      )
      .replace(
        "__META_CAN__",
        ` ${("https" + "://" + req.get("host") + req.originalUrl).replace(
          "wwww.",
          ""
        )}`
      );
    return res.send(htmlData);
  });
});

//MatterportFeature

app.get(
  "/advance-the-cause/matterport-feature-request/matterport-feature-request-form",
  function (req, res) {
    const filePath = path.resolve(__dirname, "..", "build", "index.html");

    fs.readFile(filePath, "utf8", function (err, htmlData) {
      if (err) {
        return console.log(err);
      }

      htmlData = htmlData
        .replace(
          /{{title}}/,
          `Matterport Feature Request Form  - Actionable Insights`
        )
        .replace(
          "__META_OG_TITLE__",
          `Matterport Feature Request Form - Actionable Insights`
        )
        .replace(
          "__META_OG_DESCRIPTION__",
          "Matterport Feature Request. Learn how the Actionable Insights team reviews your recommendation and incorporates it into the ongoing Matterport Request Manifest. - (Matterport Feature Request. Once you submit your recommendation, the Actionable Insights team will review your suggestion. If it is determined to be a credible and warranted addition, it will be incorporated into the ongoing Matterport Request Manifest and compared against previous submissions. This is the manifest that serves as the living ...)"
        )
        .replace(
          "__META_DESCRIPTION__",
          "Matterport Feature Request. Learn how the Actionable Insights team reviews your recommendation and incorporates it into the ongoing Matterport Request Manifest. - (Matterport Feature Request. Once you submit your recommendation, the Actionable Insights team will review your suggestion. If it is determined to be a credible and warranted addition, it will be incorporated into the ongoing Matterport Request Manifest and compared against previous submissions. This is the manifest that serves as the living ...)"
        )
        .replace(
          "__META_OG_IMAGE__",
          "https://getinsights2-data.s3.amazonaws.com/OG.png"
        )
        .replace(
          "__META_CAN__",
          ` ${("https" + "://" + req.get("host") + req.originalUrl).replace(
            "wwww.",
            ""
          )}`
        );
      return res.send(htmlData);
    });
  }
);

//Swag

app.get("/swag", function (req, res) {
  const filePath = path.resolve(__dirname, "..", "build", "index.html");

  fs.readFile(filePath, "utf8", function (err, htmlData) {
    if (err) {
      return console.log(err);
    }

    htmlData = htmlData
      .replace(/{{title}}/, `SWAG - Actionable Insights Merch | Estimate in style`)
      .replace("__META_OG_TITLE__", `SWAG - Actionable Insights Merch | Estimate in style`)
      .replace(
        "__META_OG_DESCRIPTION__",
        "Explore all the Swag merch, we have to offer. You can even use Insighter Points to pay for items. Get your hands on more from Actionable Insights."
      )
      .replace(
        "__META_DESCRIPTION__",
        "Explore all the Swag merch, we have to offer. You can even use Insighter Points to pay for items. Get your hands on more from Actionable Insights."
      )
      .replace(
        "__META_OG_IMAGE__",
        "https://getinsights2-data.s3.amazonaws.com/OG.png"
      )
      .replace(
        "__META_CAN__",
        ` ${("https" + "://" + req.get("host") + req.originalUrl).replace(
          "wwww.",
          ""
        )}`
      );
    return res.send(htmlData);
  });
});

//GiftCards

app.get("/resources/gift-cards", function (req, res) {
  const filePath = path.resolve(__dirname, "..", "build", "index.html");

  fs.readFile(filePath, "utf8", function (err, htmlData) {
    if (err) {
      return console.log(err);
    }

    htmlData = htmlData
      .replace(/{{title}}/, `Gift Cards  - Actionable Insights`)
      .replace("__META_OG_TITLE__", `Gift Cards - Actionable Insights`)
      .replace(
        "__META_OG_DESCRIPTION__",
        "Here's how you can say thank you in a credible way to those in your network. You asked and we delivered! Check out how to use your Actionable Insights gift card."
      )
      .replace(
        "__META_DESCRIPTION__",
        "Here's how you can say thank you in a credible way to those in your network. You asked and we delivered! Check out how to use your Actionable Insights gift card."
      )
      .replace(
        "__META_OG_IMAGE__",
        "https://getinsights2-data.s3.amazonaws.com/OG.png"
      )
      .replace(
        "__META_CAN__",
        ` ${("https" + "://" + req.get("host") + req.originalUrl).replace(
          "wwww.",
          ""
        )}`
      );
    return res.send(htmlData);
  });
});

//ISCollaboration

app.get("/advance-the-cause/insight-sheet-collaboration", function (req, res) {
  const filePath = path.resolve(__dirname, "..", "build", "index.html");

  fs.readFile(filePath, "utf8", function (err, htmlData) {
    if (err) {
      return console.log(err);
    }

    htmlData = htmlData
      .replace(
        /{{title}}/,
        `Insight Sheet Collaboration | Advance the Database with us`
      )
      .replace(
        "__META_OG_TITLE__",
        `Insight Sheet Collaboration | Advance the Database with us`
      )
      .replace(
        "__META_OG_DESCRIPTION__",
        "Did you find room for improvement and upgrades in our Insight Sheets? We want to hear your feedback. Fill out this form and share it with us."
      )
      .replace(
        "__META_DESCRIPTION__",
        "Did you find room for improvement and upgrades in our Insight Sheets? We want to hear your feedback. Fill out this form and share it with us."
      )
      .replace(
        "__META_OG_IMAGE__",
        "https://getinsights2-data.s3.amazonaws.com/OG.png"
      )
      .replace(
        "__META_CAN__",
        ` ${("https" + "://" + req.get("host") + req.originalUrl).replace(
          "wwww.",
          ""
        )}`
      );
    return res.send(htmlData);
  });
});

app.get("/advance-the-cause/insight-sheet-collaboration/insight-sheets-collaboration-form", function (req, res) {
  const filePath = path.resolve(__dirname, "..", "build", "index.html");

  fs.readFile(filePath, "utf8", function (err, htmlData) {
    if (err) {
      return console.log(err);
    }

    htmlData = htmlData
      .replace(
        /{{title}}/,
        `Insight Sheets Collaboration Form  - Actionable Insights`
      )
      .replace(
        "__META_OG_TITLE__",
        `Insight Sheets Collaboration Form - Actionable Insights`
      )
      .replace(
        "__META_OG_DESCRIPTION__",
        "Request the creation of an entirely new Insight Sheet. Apply to be a contributor for an existing Insight Sheet by submitting an image(s) in support of said sheet. - (Insight Sheets Collaboration. Advance The Insight Sheet Database. The Insight Sheet Database will continue to evolve and mature for decades to come. As new technologies are introduced and regulatory environments change, we remain confident that there will be a sustained demand for the publication of new Insight Sheets that seek to address these realities. As such, we will constantly be ...)"
      )
      .replace(
        "__META_DESCRIPTION__",
        "Request the creation of an entirely new Insight Sheet. Apply to be a contributor for an existing Insight Sheet by submitting an image(s) in support of said sheet. - (Insight Sheets Collaboration. Advance The Insight Sheet Database. The Insight Sheet Database will continue to evolve and mature for decades to come. As new technologies are introduced and regulatory environments change, we remain confident that there will be a sustained demand for the publication of new Insight Sheets that seek to address these realities. As such, we will constantly be ...)"
      )
      .replace(
        "__META_OG_IMAGE__",
        "https://getinsights2-data.s3.amazonaws.com/OG.png"
      )
      .replace(
        "__META_CAN__",
        ` ${("https" + "://" + req.get("host") + req.originalUrl).replace(
          "wwww.",
          ""
        )}`
      );
    return res.send(htmlData);
  });
});

//ActionableProfileAlertRequest

app.get("/advance-the-cause/actionable-profile-alert-request", function (req, res) {
  const filePath = path.resolve(__dirname, "..", "build", "index.html");

  fs.readFile(filePath, "utf8", function (err, htmlData) {
    if (err) {
      return console.log(err);
    }

    htmlData = htmlData
      .replace(
        /{{title}}/,
        `Actionable Profile Alert Request Form | Vouch for new alerts`
      )
      .replace(
        "__META_OG_TITLE__",
        `Actionable Profile Alert Request Form | Vouch for new alerts`
      )
      .replace(
        "__META_OG_DESCRIPTION__",
        "We improve Actionable Alerts based on your feedback. Help us create better alerts and improve your Xactimate experience. Share your thoughts with us."
      )
      .replace(
        "__META_DESCRIPTION__",
        "We improve Actionable Alerts based on your feedback. Help us create better alerts and improve your Xactimate experience. Share your thoughts with us."
      )
      .replace(
        "__META_OG_IMAGE__",
        "https://getinsights2-data.s3.amazonaws.com/OG.png"
      )
      .replace(
        "__META_CAN__",
        ` ${("https" + "://" + req.get("host") + req.originalUrl).replace(
          "wwww.",
          ""
        )}`
      );
    return res.send(htmlData);
  });
});

app.get("/advance-the-cause/actionable-profile-alert-request/actionable-profile-alert-request-form", function (req, res) {
  const filePath = path.resolve(__dirname, "..", "build", "index.html");

  fs.readFile(filePath, "utf8", function (err, htmlData) {
    if (err) {
      return console.log(err);
    }

    htmlData = htmlData
      .replace(
        /{{title}}/,
        `Request a Custom Alert in the Actionable Profile - Actionable Insights`
      )
      .replace(
        "__META_OG_TITLE__",
        `Request a Custom Alert in the Actionable Profile - Actionable Insights`
      )
      .replace(
        "__META_OG_DESCRIPTION__",
        "Elevate your Xactimate estimates with custom alerts in the Actionable Profile. Request a personalized alert tailored to your specific needs and enhance the accuracy and efficiency of your Xactimate Estimates."
      )
      .replace(
        "__META_DESCRIPTION__",
        "Elevate your Xactimate estimates with custom alerts in the Actionable Profile. Request a personalized alert tailored to your specific needs and enhance the accuracy and efficiency of your Xactimate Estimates."
      )
      .replace(
        "__META_OG_IMAGE__",
        "https://getinsights2-data.s3.amazonaws.com/OG.png"
      )
      .replace(
        "__META_CAN__",
        ` ${("https" + "://" + req.get("host") + req.originalUrl).replace(
          "wwww.",
          ""
        )}`
      );
    return res.send(htmlData);
  });
});

//XactimateFeatureRequest

app.get("/advance-the-cause/xactimate-feature-request", function (req, res) {
  const filePath = path.resolve(__dirname, "..", "build", "index.html");

  fs.readFile(filePath, "utf8", function (err, htmlData) {
    if (err) {
      return console.log(err);
    }

    htmlData = htmlData
      .replace(
        /{{title}}/,
        `Xactimate Feature Request | Actionable Insights`
      )
      .replace(
        "__META_OG_TITLE__",
        `Xactimate Feature Request | Actionable Insights`
      )
      .replace(
        "__META_OG_DESCRIPTION__",
        "Do you have a unique idea for a new Xactimate feature? We are here to champion your suggestion! Submit your idea & we will take it to the stakeholders."
      )
      .replace(
        "__META_DESCRIPTION__",
        "Do you have a unique idea for a new Xactimate feature? We are here to champion your suggestion! Submit your idea & we will take it to the stakeholders."
      )
      .replace(
        "__META_OG_IMAGE__",
        "https://getinsights2-data.s3.amazonaws.com/OG.png"
      )
      .replace(
        "__META_CAN__",
        ` ${("https" + "://" + req.get("host") + req.originalUrl).replace(
          "wwww.",
          ""
        )}`
      );
    return res.send(htmlData);
  });
});

//2DayTraining

app.get("/2-day-remote-training", function (req, res) {
  const filePath = path.resolve(__dirname, "..", "build", "index.html");

  fs.readFile(filePath, "utf8", function (err, htmlData) {
    if (err) {
      return console.log(err);
    }

    htmlData = htmlData
      .replace(/{{title}}/, `2-Day Remote Training  - Actionable Insights`)
      .replace(
        "__META_OG_TITLE__",
        `2-Day Remote Training - Actionable Insights`
      )
      .replace(
        "__META_OG_DESCRIPTION__",
        "Actionable Insights has been proving online training for Xactimate and Matterport since 2016. It's been an incredibly efficient way to provide impactful knowledge. - (Actionable Insights has been training Xactimate and Matterport online since 2016. We've found it's an incredibly efficient way to provide our impactful ...)"
      )
      .replace(
        "__META_DESCRIPTION__",
        "Actionable Insights has been proving online training for Xactimate and Matterport since 2016. It's been an incredibly efficient way to provide impactful knowledge. - (Actionable Insights has been training Xactimate and Matterport online since 2016. We've found it's an incredibly efficient way to provide our impactful ...)"
      )
      .replace(
        "__META_OG_IMAGE__",
        "https://getinsights2-data.s3.amazonaws.com/OG.png"
      )
      .replace(
        "__META_CAN__",
        ` ${("https" + "://" + req.get("host") + req.originalUrl).replace(
          "wwww.",
          ""
        )}`
      );
    return res.send(htmlData);
  });
});

//2DayTraining

app.get("/3-day-site-training", function (req, res) {
  const filePath = path.resolve(__dirname, "..", "build", "index.html");

  fs.readFile(filePath, "utf8", function (err, htmlData) {
    if (err) {
      return console.log(err);
    }

    htmlData = htmlData
      .replace(/{{title}}/, `3-Day On-Site Training  - Actionable Insights`)
      .replace(
        "__META_OG_TITLE__",
        `3-Day On-Site Training - Actionable Insights`
      )
      .replace(
        "__META_OG_DESCRIPTION__",
        "Actionable Insights has been flying around the country training Xactimate and Matterport since 2016. There's no experience like an AI private training."
      )
      .replace(
        "__META_DESCRIPTION__",
        "Actionable Insights has been flying around the country training Xactimate and Matterport since 2016. There's no experience like an AI private training."
      )
      .replace(
        "__META_OG_IMAGE__",
        "https://getinsights2-data.s3.amazonaws.com/OG.png"
      )
      .replace(
        "__META_CAN__",
        ` ${("https" + "://" + req.get("host") + req.originalUrl).replace(
          "wwww.",
          ""
        )}`
      );
    return res.send(htmlData);
  });
});

//2DayTraining

app.get("/train-tomorrow-today", function (req, res) {
  const filePath = path.resolve(__dirname, "..", "build", "index.html");

  fs.readFile(filePath, "utf8", function (err, htmlData) {
    if (err) {
      return console.log(err);
    }

    htmlData = htmlData
      .replace(/{{title}}/, `Train for Tomorrow - Today  - Actionable Insights`)
      .replace(
        "__META_OG_TITLE__",
        `Train for Tomorrow - Today - Actionable Insights`
      )
      .replace(
        "__META_OG_DESCRIPTION__",
        "Want to know what kind of private training Actionable Insights has to offer? Figure out what training works best for you and your team, remote or on-site."
      )
      .replace(
        "__META_DESCRIPTION__",
        "Want to know what kind of private training Actionable Insights has to offer? Figure out what training works best for you and your team, remote or on-site."
      )
      .replace(
        "__META_OG_IMAGE__",
        "https://getinsights2-data.s3.amazonaws.com/OG.png"
      )
      .replace(
        "__META_CAN__",
        ` ${("https" + "://" + req.get("host") + req.originalUrl).replace(
          "wwww.",
          ""
        )}`
      );
    return res.send(htmlData);
  });
});

//MediaKit

app.get("/media-kit", function (req, res) {
  const filePath = path.resolve(__dirname, "..", "build", "index.html");

  fs.readFile(filePath, "utf8", function (err, htmlData) {
    if (err) {
      return console.log(err);
    }

    htmlData = htmlData
      .replace(/{{title}}/, `Media Kit - Actionable Insights`)
      .replace("__META_OG_TITLE__", "Media Kit - Actionable Insights")
      .replace(
        "__META_OG_DESCRIPTION__",
        "Download our media kit when you need to use our brand assets"
      )
      .replace(
        "__META_DESCRIPTION__",
        "Download our media kit when you need to use our brand assets"
      )
      .replace(
        "__META_OG_IMAGE__",
        "https://getinsights2-data.s3.amazonaws.com/OG.png"
      )
      .replace(
        "__META_CAN__",
        ` ${("https" + "://" + req.get("host") + req.originalUrl).replace(
          "wwww.",
          ""
        )}`
      );
    return res.send(htmlData);
  });
});

//ContactUs

app.get("/contact-us", function (req, res) {
  const filePath = path.resolve(__dirname, "..", "build", "index.html");

  fs.readFile(filePath, "utf8", function (err, htmlData) {
    if (err) {
      return console.log(err);
    }

    htmlData = htmlData
      .replace(/{{title}}/, `Contact Us - Actionable Insights`)
      .replace("__META_OG_TITLE__", "Contact Us - Actionable Insights")
      .replace(
        "__META_OG_DESCRIPTION__",
        "Need to get in touch with our office? Give us a call or fill out the form on this page and let's have a chat!"
      )
      .replace(
        "__META_DESCRIPTION__",
        "Need to get in touch with our office? Give us a call or fill out the form on this page and let's have a chat!"
      )
      .replace(
        "__META_OG_IMAGE__",
        "https://getinsights2-data.s3.amazonaws.com/OG.png"
      )
      .replace(
        "__META_CAN__",
        ` ${("https" + "://" + req.get("host") + req.originalUrl).replace(
          "wwww.",
          ""
        )}`
      );
    return res.send(htmlData);
  });
});

//ContactUsForQuote

app.get("/request-a-quote", function (req, res) {
  const filePath = path.resolve(__dirname, "..", "build", "index.html");

  fs.readFile(filePath, "utf8", function (err, htmlData) {
    if (err) {
      return console.log(err);
    }

    htmlData = htmlData
      .replace(/{{title}}/, `Actionable Profile Enterprise Plan`)
      .replace("__META_OG_TITLE__", "Actionable Profile Enterprise Plan")
      .replace(
        "__META_OG_DESCRIPTION__",
        "Contact the Membership Services team for a customized Actionable Insights Enterprise Plan quote."
      )
      .replace(
        "__META_DESCRIPTION__",
        "Contact the Membership Services team for a customized Actionable Insights Enterprise Plan quote."
      )
      .replace(
        "__META_OG_IMAGE__",
        "https://getinsights2-data.s3.amazonaws.com/OG.png"
      )
      .replace(
        "__META_CAN__",
        ` ${("https" + "://" + req.get("host") + req.originalUrl).replace(
          "wwww.",
          ""
        )}`
      );
    return res.send(htmlData);
  });
});

//GetStarted

app.get("/get-started", function (req, res) {
  const filePath = path.resolve(__dirname, "..", "build", "index.html");

  fs.readFile(filePath, "utf8", function (err, htmlData) {
    if (err) {
      return console.log(err);
    }

    htmlData = htmlData
      .replace(/{{title}}/, `Get Started`)
      .replace("__META_OG_TITLE__", "Get Started")
      .replace(
        "__META_OG_DESCRIPTION__",
        "Hello! I'm Fevy. I'll get you signed up in seconds. Ready to go? Thanks, What's your name? Nice to meet you ! What's your mobile number?"
      )
      .replace(
        "__META_DESCRIPTION__",
        "Hello! I'm Fevy. I'll get you signed up in seconds. Ready to go? Thanks, What's your name? Nice to meet you ! What's your mobile number?"
      )
      .replace(
        "__META_OG_IMAGE__",
        "https://getinsights2-data.s3.amazonaws.com/OG.png"
      )
      .replace(
        "__META_CAN__",
        ` ${("https" + "://" + req.get("host") + req.originalUrl).replace(
          "wwww.",
          ""
        )}`
      );
    return res.send(htmlData);
  });
});

//MyAccount

app.get("/my-account", function (req, res) {
  const filePath = path.resolve(__dirname, "..", "build", "index.html");

  fs.readFile(filePath, "utf8", function (err, htmlData) {
    if (err) {
      return console.log(err);
    }

    htmlData = htmlData
      .replace(/{{title}}/, `Sign in to Actionable Insights | Xactimate & Matterport Resources`)
      .replace("__META_OG_TITLE__", "Sign in to Actionable Insights | Xactimate & Matterport Resources")
      .replace(
        "__META_OG_DESCRIPTION__",
        "Create an Insighter account with Actionable Insights to access free Xactimate and Matterport Resources, Insighter points, and more. Sign up now."
      )
      .replace(
        "__META_DESCRIPTION__",
        "Create an Insighter account with Actionable Insights to access free Xactimate and Matterport Resources, Insighter points, and more. Sign up now."
      )
      .replace(
        "__META_OG_IMAGE__",
        "https://getinsights2-data.s3.amazonaws.com/OG.png"
      )
      .replace(
        "__META_CAN__",
        ` ${("https" + "://" + req.get("host") + req.originalUrl).replace(
          "wwww.",
          ""
        )}`
      );
    return res.send(htmlData);
  });
});

//FoundationStructure

app.get("/foundation-structure", function (req, res) {
  const filePath = path.resolve(__dirname, "..", "build", "index.html");

  fs.readFile(filePath, "utf8", function (err, htmlData) {
    if (err) {
      return console.log(err);
    }

    htmlData = htmlData
      .replace(/{{title}}/, `Foundation Structure - Actionable Insights`)
      .replace(
        "__META_OG_TITLE__",
        "Foundation Structure - Actionable Insights"
      )
      .replace(
        "__META_OG_DESCRIPTION__",
        "Actionable Insights is a foundation that exists to preserve the health of the restoration ecosystem by advancing legislation and clarifying globally recognized billing standards."
      )
      .replace(
        "__META_DESCRIPTION__",
        "Actionable Insights is a foundation that exists to preserve the health of the restoration ecosystem by advancing legislation and clarifying globally recognized billing standards."
      )
      .replace(
        "__META_OG_IMAGE__",
        "https://getinsights2-data.s3.amazonaws.com/OG.png"
      )
      .replace(
        "__META_CAN__",
        ` ${("https" + "://" + req.get("host") + req.originalUrl).replace(
          "wwww.",
          ""
        )}`
      );
    return res.send(htmlData);
  });
});

app.get("/verisk-elevate", function (req, res) {
  const filePath = path.resolve(__dirname, "..", "build", "index.html");

  fs.readFile(filePath, "utf8", function (err, htmlData) {
    if (err) {
      return console.log(err);
    }

    htmlData = htmlData
      .replace(/{{title}}/, `Verisk Elevate - Actionable Insights`)
      .replace("__META_OG_TITLE__", "Verisk Elevate - Actionable Insights")
      .replace(
        "__META_OG_DESCRIPTION__",
        "Verisk Elevate unites insurance restoration professionals, helping you expand connections and partnerships. Attend sessions and workshops to find innovations, trends, and best practices. The event also provides access to experts offering unique outlooks on industry direction. You may find new technologies and solutions to help your organization overcome challenges, like the Actionable Xactimate Profile fueled by XactXpert"
      )
      .replace(
        "__META_DESCRIPTION__",
        "Verisk Elevate unites insurance restoration professionals, helping you expand connections and partnerships. Attend sessions and workshops to find innovations, trends, and best practices. The event also provides access to experts offering unique outlooks on industry direction. You may find new technologies and solutions to help your organization overcome challenges, like the Actionable Xactimate Profile fueled by XactXpert"
      )
      .replace(
        "__META_OG_IMAGE__",
        "https://getinsights2-data.s3.amazonaws.com/OG.png"
      )
      .replace(
        "__META_CAN__",
        ` ${("https" + "://" + req.get("host") + req.originalUrl).replace(
          "wwww.",
          ""
        )}`
      );
    return res.send(htmlData);
  });
});

//Live

app.get("/live", function (req, res) {
  const filePath = path.resolve(__dirname, "..", "build", "index.html");

  fs.readFile(filePath, "utf8", function (err, htmlData) {
    if (err) {
      return console.log(err);
    }

    htmlData = htmlData
      .replace(
        /{{title}}/,
        `Actionable Reaction Live Stream Zone - Actionable Insights`
      )
      .replace(
        "__META_OG_TITLE__",
        "Actionable Reaction Live Stream Zone - Actionable Insights"
      )
      .replace(
        "__META_OG_DESCRIPTION__",
        "Actionable Insights is Live! Come join in for an exciting Live Actionable Reaction!"
      )
      .replace(
        "__META_DESCRIPTION__",
        "Actionable Insights is Live! Come join in for an exciting Live Actionable Reaction!"
      )
      .replace(
        "__META_OG_IMAGE__",
        "https://getinsights2-data.s3.amazonaws.com/OG.png"
      )
      .replace(
        "__META_CAN__",
        ` ${("https" + "://" + req.get("host") + req.originalUrl).replace(
          "wwww.",
          ""
        )}`
      );
    return res.send(htmlData);
  });
});

//AboutPage

app.get("/about-us", function (req, res) {
  const filePath = path.resolve(__dirname, "..", "build", "index.html");

  console.log(filePath, "path");

  fs.readFile(filePath, "utf8", function (err, htmlData) {
    if (err) {
      return console.log(err);
    }

    htmlData = htmlData
      .replace(/{{title}}/, `About Us`)
      .replace("__META_OG_TITLE__", "About Us")
      .replace(
        "__META_OG_DESCRIPTION__",
        "Actionable Insights is a foundation that exists to preserve the health of the restoration ecosystem by advancing legislation and clarifying globally."
      )
      .replace(
        "__META_DESCRIPTION__",
        "Actionable Insights is a foundation that exists to preserve the health of the restoration ecosystem by advancing legislation and clarifying globally."
      )
      .replace(
        "__META_OG_IMAGE__",
        "https://getinsights2-data.s3.amazonaws.com/OG.png"
      )
      .replace(
        "__META_CAN__",
        ` ${("https" + "://" + req.get("host") + req.originalUrl).replace(
          "wwww.",
          ""
        )}`
      );
    return res.send(htmlData);
  });
});

//VeriskElevate

app.get("/verisk-elevate", function (req, res) {
  const filePath = path.resolve(__dirname, "..", "build", "index.html");

  console.log(filePath, "path");

  fs.readFile(filePath, "utf8", function (err, htmlData) {
    if (err) {
      return console.log(err);
    }

    htmlData = htmlData
      .replace(/{{title}}/, `Verisk Elevate`)
      .replace("__META_OG_TITLE__", "Verisk Elevate")
      .replace(
        "__META_OG_DESCRIPTION__",
        "Verisk Elevate unites insurance restoration professionals, helping you expand connections and partnerships. Attend sessions and workshops to find innovations, trends, and best practices. The event also provides access to experts offering unique outlooks on industry direction. You may find new technologies and solutions to help your organization overcome challenges, like the Actionable Xactimate Profile fueled by XactXpert"
      )
      .replace(
        "__META_DESCRIPTION__",
        "Verisk Elevate unites insurance restoration professionals, helping you expand connections and partnerships. Attend sessions and workshops to find innovations, trends, and best practices. The event also provides access to experts offering unique outlooks on industry direction. You may find new technologies and solutions to help your organization overcome challenges, like the Actionable Xactimate Profile fueled by XactXpert"
      )
      .replace(
        "__META_OG_IMAGE__",
        "https://getinsights2-data.s3.amazonaws.com/OG.png"
      )
      .replace(
        "__META_CAN__",
        ` ${("https" + "://" + req.get("host") + req.originalUrl).replace(
          "wwww.",
          ""
        )}`
      );
    return res.send(htmlData);
  });
});

//Floodlight

app.get("/floodlight", function (req, res) {
  const filePath = path.resolve(__dirname, "..", "build", "index.html");

  console.log(filePath, "path");

  fs.readFile(filePath, "utf8", function (err, htmlData) {
    if (err) {
      return console.log(err);
    }

    htmlData = htmlData
      .replace(
        /{{title}}/,
        `Floodlight & Actionable Insights: Optimize Your Estimating with the Actionable Xactimate Profile`
      )
      .replace(
        "__META_OG_TITLE__",
        "Floodlight & Actionable Insights: Optimize Your Estimating with the Actionable Xactimate Profile"
      )
      .replace(
        "__META_OG_DESCRIPTION__",
        "Discover the power of the Actionable Profile! Improve your Xactimate scopes via the live estimating guidance that corrects mistakes and identifies line items you should include."
      )
      .replace(
        "__META_DESCRIPTION__",
        "Discover the power of the Actionable Profile! Improve your Xactimate scopes via the live estimating guidance that corrects mistakes and identifies line items you should include."
      )
      .replace(
        "__META_OG_IMAGE__",
        "https://getinsights2-data.s3.amazonaws.com/OG.png"
      )
      .replace(
        "__META_CAN__",
        ` ${("https" + "://" + req.get("host") + req.originalUrl).replace(
          "wwww.",
          ""
        )}`
      );
    return res.send(htmlData);
  });
});

//ElevateLeads

app.get("/elevate-leads", function (req, res) {
  const filePath = path.resolve(__dirname, "..", "build", "index.html");

  console.log(filePath, "path");

  fs.readFile(filePath, "utf8", function (err, htmlData) {
    if (err) {
      return console.log(err);
    }

    htmlData = htmlData
      .replace(/{{title}}/, `Elevate Leads`)
      .replace("__META_OG_TITLE__", "Elevate Leads")
      .replace(
        "__META_OG_DESCRIPTION__",
        "The Actionable Xactimate Profile is an estimating solution that provides live estimating guidance within Xactimate, helping guide Xactimate users toward a complete and thorough scope of work. The tool aims to give equal credence to both overages as well as omissions, help reduce cycle times, champion a spirit of fairly settled claims, and foster environments of reasonable profits."
      )
      .replace(
        "__META_DESCRIPTION__",
        "The Actionable Xactimate Profile is an estimating solution that provides live estimating guidance within Xactimate, helping guide Xactimate users toward a complete and thorough scope of work. The tool aims to give equal credence to both overages as well as omissions, help reduce cycle times, champion a spirit of fairly settled claims, and foster environments of reasonable profits."
      )
      .replace(
        "__META_OG_IMAGE__",
        "https://getinsights2-data.s3.amazonaws.com/OG.png"
      )
      .replace(
        "__META_CAN__",
        ` ${("https" + "://" + req.get("host") + req.originalUrl).replace(
          "wwww.",
          ""
        )}`
      );
    return res.send(htmlData);
  });
});

//CustomizedXactxpertAlerts

app.get("/customized-xactxpert-alerts", function (req, res) {
  const filePath = path.resolve(__dirname, "..", "build", "index.html");

  console.log(filePath, "path");

  fs.readFile(filePath, "utf8", function (err, htmlData) {
    if (err) {
      return console.log(err);
    }

    htmlData = htmlData
      .replace(/{{title}}/, `Customized XactXpert Alerts - Actionable Insights`)
      .replace("__META_OG_TITLE__", "Customized XactXpert Alerts - Actionable Insights")
      .replace(
        "__META_OG_DESCRIPTION__",
        "Work one-on-one with an Actionable Insights team member to develop customized XactXpert alerts for your company."
      )
      .replace(
        "__META_DESCRIPTION__",
        "Work one-on-one with an Actionable Insights team member to develop customized XactXpert alerts for your company."
      )
      .replace(
        "__META_OG_IMAGE__",
        "https://getinsights2-data.s3.amazonaws.com/OG.png"
      )
      .replace(
        "__META_CAN__",
        ` ${("https" + "://" + req.get("host") + req.originalUrl).replace(
          "wwww.",
          ""
        )}`
      );
    return res.send(htmlData);
  });
});

//RiaConventionLeads

app.get("/ria-convention-leads", function (req, res) {
  const filePath = path.resolve(__dirname, "..", "build", "index.html");

  console.log(filePath, "path");

  fs.readFile(filePath, "utf8", function (err, htmlData) {
    if (err) {
      return console.log(err);
    }

    htmlData = htmlData
      .replace(/{{title}}/, `RIA Convention Leads`)
      .replace("__META_OG_TITLE__", "RIA Convention Leads")
      .replace(
        "__META_OG_DESCRIPTION__",
        "The Actionable Xactimate Profile is an estimating solution that provides live estimating guidance within Xactimate, helping guide Xactimate users toward a complete and thorough scope of work. The tool aims to give equal credence to both overages as well as omissions, help reduce cycle times, champion a spirit of fairly settled claims, and foster environments of reasonable profits."
      )
      .replace(
        "__META_DESCRIPTION__",
        "The Actionable Xactimate Profile is an estimating solution that provides live estimating guidance within Xactimate, helping guide Xactimate users toward a complete and thorough scope of work. The tool aims to give equal credence to both overages as well as omissions, help reduce cycle times, champion a spirit of fairly settled claims, and foster environments of reasonable profits."
      )
      .replace(
        "__META_OG_IMAGE__",
        "https://getinsights2-data.s3.amazonaws.com/OG.png"
      )
      .replace(
        "__META_CAN__",
        ` ${("https" + "://" + req.get("host") + req.originalUrl).replace(
          "wwww.",
          ""
        )}`
      );
    return res.send(htmlData);
  });
});

//ConventionLeads

app.get("/convention-leads", function (req, res) {
  const filePath = path.resolve(__dirname, "..", "build", "index.html");

  console.log(filePath, "path");

  fs.readFile(filePath, "utf8", function (err, htmlData) {
    if (err) {
      return console.log(err);
    }

    htmlData = htmlData
      .replace(/{{title}}/, `Convention Leads`)
      .replace("__META_OG_TITLE__", "Convention Leads")
      .replace(
        "__META_OG_DESCRIPTION__",
        "Unlock exclusive insights and resources. Sign up now to access valuable industry information, expert tips, and special offers tailored just for you. Join our community today!"
      )
      .replace(
        "__META_DESCRIPTION__",
        "Unlock exclusive insights and resources. Sign up now to access valuable industry information, expert tips, and special offers tailored just for you. Join our community today!"
      )
      .replace(
        "__META_OG_IMAGE__",
        "https://getinsights2-data.s3.amazonaws.com/OG.png"
      )
      .replace(
        "__META_CAN__",
        ` ${("https" + "://" + req.get("host") + req.originalUrl).replace(
          "wwww.",
          ""
        )}`
      );
    return res.send(htmlData);
  });
});

//RiaAffinityProgram

app.get("/ria-affinity-program", function (req, res) {
  const filePath = path.resolve(__dirname, "..", "build", "index.html");

  console.log(filePath, "path");

  fs.readFile(filePath, "utf8", function (err, htmlData) {
    if (err) {
      return console.log(err);
    }

    htmlData = htmlData
      .replace(/{{title}}/, `RIA Affinity Program - Actionable Insights`)
      .replace("__META_OG_TITLE__", "RIA Affinity Program - Actionable Insights")
      .replace(
        "__META_OG_DESCRIPTION__",
        "Actionable Insights has an exciting offer for RIA Members. Get a lifetime 10% off on our Actionable Xactimate Profile Pro Plan. Check it out now!"
      )
      .replace(
        "__META_DESCRIPTION__",
        "Actionable Insights has an exciting offer for RIA Members. Get a lifetime 10% off on our Actionable Xactimate Profile Pro Plan. Check it out now!"
      )
      .replace(
        "__META_OG_IMAGE__",
        "https://getinsights2-data.s3.amazonaws.com/OG.png"
      )
      .replace(
        "__META_CAN__",
        ` ${("https" + "://" + req.get("host") + req.originalUrl).replace(
          "wwww.",
          ""
        )}`
      );
    return res.send(htmlData);
  });
});

//MasterXactimateImproveEstimatingSkills

app.get("/master-xactimate-improve-estimating-skills", function (req, res) {
  const filePath = path.resolve(__dirname, "..", "build", "index.html");

  console.log(filePath, "path");

  fs.readFile(filePath, "utf8", function (err, htmlData) {
    if (err) {
      return console.log(err);
    }

    htmlData = htmlData
      .replace(/{{title}}/, `Master Xactimate: Avoid Common Mistakes and Improve Your Estimating Skills`)
      .replace("__META_OG_TITLE__", "Master Xactimate: Avoid Common Mistakes and Improve Your Estimating Skills")
      .replace(
        "__META_OG_DESCRIPTION__",
        "Want to master Xactimate? Our expert tips and the Actionable Profile will help you write accurate estimates and create better outcomes. Read more."
      )
      .replace(
        "__META_DESCRIPTION__",
        "Want to master Xactimate? Our expert tips and the Actionable Profile will help you write accurate estimates and create better outcomes. Read more."
      )
      .replace(
        "__META_OG_IMAGE__",
        "https://getinsights2-data.s3.amazonaws.com/OG.png"
      )
      .replace(
        "__META_CAN__",
        ` ${("https" + "://" + req.get("host") + req.originalUrl).replace(
          "wwww.",
          ""
        )}`
      );
    return res.send(htmlData);
  });
});

//MasterXactimateImportantTips

app.get("/master-xactimate-important-tips", function (req, res) {
  const filePath = path.resolve(__dirname, "..", "build", "index.html");

  console.log(filePath, "path");

  fs.readFile(filePath, "utf8", function (err, htmlData) {
    if (err) {
      return console.log(err);
    }

    htmlData = htmlData
      .replace(/{{title}}/, `Master Xactimate with these important tips | Actionable Insights`)
      .replace("__META_OG_TITLE__", "Master Xactimate with these important tips | Actionable Insights")
      .replace(
        "__META_OG_DESCRIPTION__",
        "Want to master Xactimate? From leveraging the latest tech to small details like formatting scopes, we have the best tips to help you write accurate estimates."
      )
      .replace(
        "__META_DESCRIPTION__",
        "Want to master Xactimate? From leveraging the latest tech to small details like formatting scopes, we have the best tips to help you write accurate estimates."
      )
      .replace(
        "__META_OG_IMAGE__",
        "https://getinsights2-data.s3.amazonaws.com/OG.png"
      )
      .replace(
        "__META_CAN__",
        ` ${("https" + "://" + req.get("host") + req.originalUrl).replace(
          "wwww.",
          ""
        )}`
      );
    return res.send(htmlData);
  });
});

//BecomeExpertXactimateEstimator

app.get("/become-expert-xactimate-estimator", function (req, res) {
  const filePath = path.resolve(__dirname, "..", "build", "index.html");

  console.log(filePath, "path");

  fs.readFile(filePath, "utf8", function (err, htmlData) {
    if (err) {
      return console.log(err);
    }

    htmlData = htmlData
      .replace(/{{title}}/, `Become an expert Xactimate Estimator with Actionable Insights`)
      .replace("__META_OG_TITLE__", "Become an expert Xactimate Estimator with Actionable Insights")
      .replace(
        "__META_OG_DESCRIPTION__",
        "Become an expert in Xactimate and learn to write increasingly accurate estimates with Actionable Insights' two-day Xactimate course. Check it out now!"
      )
      .replace(
        "__META_DESCRIPTION__",
        "Become an expert in Xactimate and learn to write increasingly accurate estimates with Actionable Insights' two-day Xactimate course. Check it out now!"
      )
      .replace(
        "__META_OG_IMAGE__",
        "https://getinsights2-data.s3.amazonaws.com/OG.png"
      )
      .replace(
        "__META_CAN__",
        ` ${("https" + "://" + req.get("host") + req.originalUrl).replace(
          "wwww.",
          ""
        )}`
      );
    return res.send(htmlData);
  });
});

//MasteringXactimateForBeginners

app.get("/mastering-xactimate-for-beginners", function (req, res) {
  const filePath = path.resolve(__dirname, "..", "build", "index.html");

  console.log(filePath, "path");

  fs.readFile(filePath, "utf8", function (err, htmlData) {
    if (err) {
      return console.log(err);
    }

    htmlData = htmlData
      .replace(/{{title}}/, `Top 5 Essential Tips for Mastering Xactimate as a Beginner`)
      .replace("__META_OG_TITLE__", "Top 5 Essential Tips for Mastering Xactimate as a Beginner")
      .replace(
        "__META_OG_DESCRIPTION__",
        "These 5 tips from our Xactimate beginner's guide will teach you to start estimating like a pro. Learn to write accurate estimates and get paid fairly."
      )
      .replace(
        "__META_DESCRIPTION__",
        "These 5 tips from our Xactimate beginner's guide will teach you to start estimating like a pro. Learn to write accurate estimates and get paid fairly."
      )
      .replace(
        "__META_OG_IMAGE__",
        "https://getinsights2-data.s3.amazonaws.com/OG.png"
      )
      .replace(
        "__META_CAN__",
        ` ${("https" + "://" + req.get("host") + req.originalUrl).replace(
          "wwww.",
          ""
        )}`
      );
    return res.send(htmlData);
  });
});

//RemoteXactimateEstimator

app.get("/remote-xactimate-estimator", function (req, res) {
  const filePath = path.resolve(__dirname, "..", "build", "index.html");

  console.log(filePath, "path");

  fs.readFile(filePath, "utf8", function (err, htmlData) {
    if (err) {
      return console.log(err);
    }

    htmlData = htmlData
      .replace(/{{title}}/, `Actionable's Guide for Remote Xactimate Estimators`)
      .replace("__META_OG_TITLE__", "Actionable's Guide for Remote Xactimate Estimators")
      .replace(
        "__META_OG_DESCRIPTION__",
        "Learn the basics of being a successful remote Xactimate estimator, the benefits, the skills required, & how to overcome related challenges. Read more."
      )
      .replace(
        "__META_DESCRIPTION__",
        "Learn the basics of being a successful remote Xactimate estimator, the benefits, the skills required, & how to overcome related challenges. Read more."
      )
      .replace(
        "__META_OG_IMAGE__",
        "https://getinsights2-data.s3.amazonaws.com/OG.png"
      )
      .replace(
        "__META_CAN__",
        ` ${("https" + "://" + req.get("host") + req.originalUrl).replace(
          "wwww.",
          ""
        )}`
      );
    return res.send(htmlData);
  });
});

//XactimateMacro

app.get("/xactimate-macro", function (req, res) {
  const filePath = path.resolve(__dirname, "..", "build", "index.html");

  console.log(filePath, "path");

  fs.readFile(filePath, "utf8", function (err, htmlData) {
    if (err) {
      return console.log(err);
    }

    htmlData = htmlData
      .replace(/{{title}}/, `Xactimate Macros: Automate and Accelerate Your Workflow`)
      .replace("__META_OG_TITLE__", "Xactimate Macros: Automate and Accelerate Your Workflow")
      .replace(
        "__META_OG_DESCRIPTION__",
        "What are Xactimate Macros, and how can you use them to automate and streamline your Xactimate estimates? Learn from our comprehensive guide. Read more."
      )
      .replace(
        "__META_DESCRIPTION__",
        "What are Xactimate Macros, and how can you use them to automate and streamline your Xactimate estimates? Learn from our comprehensive guide. Read more."
      )
      .replace(
        "__META_OG_IMAGE__",
        "https://getinsights2-data.s3.amazonaws.com/OG.png"
      )
      .replace(
        "__META_CAN__",
        ` ${("https" + "://" + req.get("host") + req.originalUrl).replace(
          "wwww.",
          ""
        )}`
      );
    return res.send(htmlData);
  });
});

//ImproveXactimateEstimates

app.get("/improve-xactimate-estimates", function (req, res) {
  const filePath = path.resolve(__dirname, "..", "build", "index.html");

  console.log(filePath, "path");

  fs.readFile(filePath, "utf8", function (err, htmlData) {
    if (err) {
      return console.log(err);
    }

    htmlData = htmlData
      .replace(/{{title}}/, `Improve Xactimate Estimates: Tips for Writing Better Estimates`)
      .replace("__META_OG_TITLE__", "Improve Xactimate Estimates: Tips for Writing Better Estimates")
      .replace(
        "__META_OG_DESCRIPTION__",
        "Discover how to improve Xactimate estimates, learn best practices for better Xactimate estimating, and enhance project outcomes. Read more."
      )
      .replace(
        "__META_DESCRIPTION__",
        "Discover how to improve Xactimate estimates, learn best practices for better Xactimate estimating, and enhance project outcomes. Read more."
      )
      .replace(
        "__META_OG_IMAGE__",
        "https://getinsights2-data.s3.amazonaws.com/OG.png"
      )
      .replace(
        "__META_CAN__",
        ` ${("https" + "://" + req.get("host") + req.originalUrl).replace(
          "wwww.",
          ""
        )}`
      );
    return res.send(htmlData);
  });
});

//XactimateTrainingOnline

app.get("/xactimate-training-online", function (req, res) {
  const filePath = path.resolve(__dirname, "..", "build", "index.html");

  console.log(filePath, "path");

  fs.readFile(filePath, "utf8", function (err, htmlData) {
    if (err) {
      return console.log(err);
    }

    htmlData = htmlData
      .replace(/{{title}}/, `Learn Xactimate Online with Actionable Insights Bootcamp`)
      .replace("__META_OG_TITLE__", "Learn Xactimate Online with Actionable Insights Bootcamp")
      .replace(
        "__META_OG_DESCRIPTION__",
        "You don't have to be on-site to learn Xactimate. Now you can join online Xactimate and Actionable Alert courses and we have just the one you need. Explore more now."
      )
      .replace(
        "__META_DESCRIPTION__",
        "You don't have to be on-site to learn Xactimate. Now you can join online Xactimate and Actionable Alert courses and we have just the one you need. Explore more now."
      )
      .replace(
        "__META_OG_IMAGE__",
        "https://getinsights2-data.s3.amazonaws.com/OG.png"
      )
      .replace(
        "__META_CAN__",
        ` ${("https" + "://" + req.get("host") + req.originalUrl).replace(
          "wwww.",
          ""
        )}`
      );
    return res.send(htmlData);
  });
});

//RealActionableInsightsWebsite

app.get("/real-actionable-insights-website", function (req, res) {
  const filePath = path.resolve(__dirname, "..", "build", "index.html");

  console.log(filePath, "path");

  fs.readFile(filePath, "utf8", function (err, htmlData) {
    if (err) {
      return console.log(err);
    }

    htmlData = htmlData
      .replace(/{{title}}/, `Getinsights.com or Getinsights.org | Actionable Insights`)
      .replace("__META_OG_TITLE__", "Getinsights.com or Getinsights.org | Actionable Insights")
      .replace(
        "__META_OG_DESCRIPTION__",
        "We are addressing the confusion regarding the Actionable Insights official website. It is getinsights.org and not getinsights.com. Read more."
      )
      .replace(
        "__META_DESCRIPTION__",
        "We are addressing the confusion regarding the Actionable Insights official website. It is getinsights.org and not getinsights.com. Read more."
      )
      .replace(
        "__META_OG_IMAGE__",
        "https://getinsights2-data.s3.amazonaws.com/OG.png"
      )
      .replace(
        "__META_CAN__",
        ` ${("https" + "://" + req.get("host") + req.originalUrl).replace(
          "wwww.",
          ""
        )}`
      );
    return res.send(htmlData);
  });
});

//DownloadCertificate

app.get("/download-certificate", function (req, res) {
  const filePath = path.resolve(__dirname, "..", "build", "index.html");

  console.log(filePath, "path");

  fs.readFile(filePath, "utf8", function (err, htmlData) {
    if (err) {
      return console.log(err);
    }

    htmlData = htmlData
      .replace(/{{title}}/, `Actionable Insights Matterport Certified Diploma`)
      .replace("__META_OG_TITLE__", "Actionable Insights Matterport Certified Diploma")
      .replace(
        "__META_OG_DESCRIPTION__",
        "Download your Actionable Insights Matterport Certified Diploma"
      )
      .replace(
        "__META_DESCRIPTION__",
        "Download your Actionable Insights Matterport Certified Diploma"
      )
      .replace(
        "__META_OG_IMAGE__",
        "https://getinsights2-data.s3.amazonaws.com/OG.png"
      )
      .replace(
        "__META_CAN__",
        ` ${("https" + "://" + req.get("host") + req.originalUrl).replace(
          "wwww.",
          ""
        )}`
      );
    return res.send(htmlData);
  });
});

app.use(
  express.static(path.resolve(__dirname, "..", "build"), { maxAge: "30d" })
);

app.get("*", function (req, res) {
  const paths = routeData?.routes.find((route) => matchPath(req.path, route));
  console.log(paths, req.path);
  if (paths == undefined) {
    res.status(404);
  }

  const filePath = path.resolve(__dirname, "..", "build", "index.html");
  console.log(filePath);

  fs.readFile(filePath, "utf8", function (err, htmlData) {
    if (err) {
      return console.log(err);
    }
    htmlData = htmlData
      .replace(/{{title}}/, `Actionable Insights`)
      .replace("__META_OG_TITLE__", "Actionable Insights")
      .replace(
        "__META_OG_DESCRIPTION__",
        "The Actionable Xactimate Profile is an estimating solution that provides live estimating guidance within Xactimate, helping guide Xactimate users toward a complete and thorough scope of work. The tool aims to give equal credence to both overages as well as omissions, help reduce cycle times, champion a spirit of fairly settled claims, and foster environments of reasonable profits."
      )
      .replace(
        "__META_DESCRIPTION__",
        "The Actionable Xactimate Profile is an estimating solution that provides live estimating guidance within Xactimate, helping guide Xactimate users toward a complete and thorough scope of work. The tool aims to give equal credence to both overages as well as omissions, help reduce cycle times, champion a spirit of fairly settled claims, and foster environments of reasonable profits."
      )
      .replace(
        "__META_OG_IMAGE__",
        "https://getinsights2-data.s3.amazonaws.com/OG.png"
      )
      .replace(
        "__META_CAN__",
        ` ${("https" + "://" + req.get("host") + req.originalUrl).replace(
          "wwww.",
          ""
        )}`
      );

    res.send(htmlData);
  });
});

// listening...
app.listen(PORT, (error) => {
  if (error) {
    return console.log("Error during app startup", error);
  }
  console.log("listening on " + PORT + "...");
});
