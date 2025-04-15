import React, { useState, useEffect, Suspense } from "react";
import { Link, withRouter } from "react-router-dom";
import LottieLoader from "../../../components/LottieLoader";
import Breadcrumbs from "../../../components/Breadcrumbs";
import ScrollToTop from "../../../components/ScrollToTop";
import SEO from "../../../components/SEO";
const Navbar = React.lazy(() => import("../../../components/Navbar"));
const Footer = React.lazy(() => import("../../../components/Footer"));
const CookieConsentGI2 = React.lazy(() => import("../../../components/CookieConsent"));
const WrongBrowserDisclaimer = React.lazy(() => import("../../../components/WrongBrowserDisclaimer"));
import { ContactUsForm } from "../../../../utils/api-routes/api-routes.util";
import { HideOn } from "react-hide-on-scroll";
import InputMask from "react-input-mask";
import ReCAPTCHA from "react-google-recaptcha";
import download from "assets/Download.svg";
import blog_image28 from "assets/blog_image28.png";

const KeyboardShortcutsForXactimate = () => {

  const [isScreenHeight, setIsScreenHeight] = useState(false);

  useEffect(() => {
    const checkFullScreen = () => {
      const height = window.innerHeight;
      if (height < 786) {
        setIsScreenHeight(true);
      } else {
        setIsScreenHeight(false);
      }
    };

    checkFullScreen();
    window.addEventListener("resize", checkFullScreen);

    return () => window.removeEventListener("resize", checkFullScreen);
  }, []);

  const [loading, setLoading] = useState(false);

  const [Msg, setMsg] = useState(false);

  const [userData, setUserData] = useState({
    firstName: "",
    lastName: "",
    youremail: "",
    yourphone: "",
    subject: "",
    message: "",
  });

  const [file, setFile] = useState("");

  const [isError, setIsError] = useState(false);

  const fileChange = (e) => {
    const file = e.target.files[0];
    setFile(e.target.files[0]);

    if(file === undefined) {
      console.log("undefined")
    } else if(file.type === "image/png" || file.type === "image/jpeg") {
      setIsError(false);
    } else {
      setIsError(true);
    }
  };

  const [verified, setVerified] = useState(false);

  function onChange(value) {
    // console.log("Captcha value:", value);
    setVerified(true);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData();
    formData.append("firstName", userData.firstName);
    formData.append("lastName", userData.lastName);
    formData.append("youremail", userData.youremail);
    formData.append("yourphone", userData.yourphone);
    formData.append("subject", userData.subject);
    formData.append("message", userData.message);
    formData.append("fileToUpload", file);

    ContactUsForm(formData).subscribe((response) => {
      if (response.response.Requested_Action) {
        setUserData({
          firstName: "",
          lastName: "",
          youremail: "",
          yourphone: "",
          subject: "",
          message: "",
        });
        setFile("");
        setMsg(response.response.Message);
        setLoading(false);
      } else {
        setMsg(false);
        setLoading(false);
      }
    });
  };
  
	return (
		<>
			<SEO
        title="Master Xactimate | Learn Commonly Used Xactimate Hotkeys"
        description="This comprehensive guide teaches you some of the best Xactimate keyboard shortcuts and why they matter. Read more"
        link="blog/keyboard-shortcuts-for-xactimate"
      />
			<Suspense
				fallback={
          <div className="loader">
            <LottieLoader />
          </div>
        }
			>
				<ScrollToTop />
				<Navbar />
        <Breadcrumbs />
        <HideOn showOnPageInit height={isScreenHeight ? 10900 : 10600}>
          <div className="blog_side_menu">
            <a href="#introduction">
              — 
              <span>Introduction</span>
            </a>
            <a href="#why-keyboard-shortcuts-matter-in-xactimate">
              —
              <span>
                Why Keyboard
                <br />
                Shortcuts Matter in
                <br />
                Xactimate
              </span>
            </a>
            <a href="#commonly-used-xactimate-hotkeys">
              — 
              <span>
                Commonly Used
                <br />
                Xactimate Hotkeys
              </span>
            </a>
            <a href="#tips-for-mastering-xactimate-shortcuts">
              — 
              <span>
                Tips for Mastering
                <br />
                Xactimate Shortcuts
              </span>
            </a>
            <a href="#become-a-master-xactimate-estimator">
              — 
              <span>
                Become a Master
                <br />
                Xactimate Estimator
              </span>
            </a>
          </div>
        </HideOn>
				<div className="main-container">
					<div className="Blog_Page">
						<div className="">
              <div className="holder DiscoverPreGeneratedVideosAndGifsInYourMatterportScansIntroduction">
                <div id="introduction">
                  <h2 className="mb-4">
                    Keyboard shortcuts for Xactimate
                  </h2>
                </div>
                <div className="sub-header">
                  <span className="team"> Team Actionable | Oct 30, 2024 </span>
                  <br />
                  <img
                    src={blog_image28}
                    className="mt-3 mb-4"
                  />
                  <p style={{ marginBottom: "-144px" }}>
                    Xactimate is a widely used, comprehensive tool that allows users to create accurate estimates, sketches, and reports for various projects, particularly in claims and damage assessment. Given its complexity, accuracy is crucial, especially for professionals dealing with high volumes of estimates.
                    <br /><br />
                    Keyboard shortcuts play a pivotal role in improving workflow by allowingusers to quickly perform essential tasks. Whether you’re new to Xactimate or a seasoned user, mastering these shortcuts will help boost productivity and save valuable time.
                    <br /><br />
                    This blog provides a comprehensive list of useful keyboard shortcuts for Xactimate and explains how to learn them to improve your workflow. Let’s dive into why these shortcuts matter and how they can transform the way you work within Xactimate.
                  </p>
                  <div
                    className="mb-5"
                    id="why-keyboard-shortcuts-matter-in-xactimate"
                  >
                  </div>
                  <div className="pb-5 pt-5"></div>
                  <h5 className="mt-5 mb-3"> Why Keyboard Shortcuts Matter in Xactimate </h5>
                  <p className="mb-4"> Manually navigating menus in Xactimate can slow down the estimating process, especially when handling multiple projects. This is where keyboard shortcuts come in, offering several key benefits: </p>
                  <p className="mb-2">
                    <strong>Enhanced Speed and Productivity</strong>
                  </p>
                  <p className="mb-4"> Shortcuts allow users to execute commands almost instantly without searching through various menus and submenus. This is particularly beneficial for repetitive tasks, such as undoing actions, duplicating items, or switching between windows. </p>
                  <p className="mb-2">
                    <strong>Reduced Reliance on Mouse Clicks</strong>
                  </p>
                  <p className="mb-4"> Constantly switching between the keyboard and mouse can be cumbersome and time-consuming. Keyboard shortcuts eliminate this back-and-forth, allowing users to remain focused on the task at hand. This not only improves speed but also reduces strain, especially for users who work with Xactimate for extended periods. </p>
                  <p className="mb-2">
                    <strong>Saving Time on Common Tasks</strong>
                  </p>
                  <p style={{ marginBottom: "-144px" }}> In Xactimate, many actions are repeated frequently, such as adding line items, editing estimates, or moving between different tabs. Keyboard shortcuts allow you to complete these tasks more efficiently. For instance, pressing CTRL + Z will instantly undo an action, while F2 enables quick editing of a selected item. These simple shortcuts, when used regularly, can shave minutes off every task, adding up to significant time savings throughout a project. </p>
                  <div
                    className="mb-5"
                    id="commonly-used-xactimate-hotkeys"
                  >
                  </div>
                  <div className="pb-5 pt-5"></div>
                  <h5 className="mt-5 mb-3"> Commonly Used Xactimate Hotkeys </h5>
                  <p className="mb-4"> Here are some of the most commonly used Xactimate shortcuts. These functions are among the most repetitive and time-consuming tasks in Xactimate. So learning these hotkeys will help save time and boost productivity. </p>
                  <div className="comparison-table" style={{ marginBottom: "-144px" }}>
                    <table>
                      <thead>
                        <tr>
                          <th>Hotkey Highlight</th>
                          <th>Hotkey</th>
                          <th>Function</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td>Staircase</td>
                          <td>C</td>
                          <td>In your sketch screen, <a href="https://www.youtube.com/watch?v=oYSZx8NzkzQ&list=PLtF55NJwJ_ZPqAryAgtP8xbFRYsTcVnhY" target="_blank">when you hit the C key</a> Xactimate automatically loads up whatever was last used as a staircase.</td>
                        </tr>
                        <tr>
                          <td>Wall Tool</td>
                          <td>Shift + W</td>
                          <td><a href="https://www.youtube.com/watch?v=Wdwkbqzb4NQ" target="_blank">To bring up the Wall tool</a>, press <b>Shift + W</b> simultaneously. Once activated, you'll see the Wall tool loaded in the top left corner. You click once then go wherever you’d like to create a wall. While <b>Shift + W</b> isn't ideal for creating entire rooms, it's perfect for quickly drawing specific walls outside of a typical room layout, like a Pony Wall.</td>
                        </tr>
                        <tr>
                          <td>Room</td>
                          <td>R</td>
                          <td>Shift + W key is not recommended to create a room. A more efficient method is to press the <b>R</b> key, which will automatically place a room in your sketch.</td>
                        </tr>
                        <tr>
                          <td>Walk-Through Mode</td>
                          <td>K</td>
                          <td><a href="https://www.youtube.com/watch?v=mSGkEHiIl2c" target="_blank">Pressing the K key</a> activates walk-through mode. You can use your mouse scroll to zoom in and move around the house, and the arrow keys to navigate through the property. While walk-through mode may not always be used, it can be a helpful tool in your ongoing efforts to work more efficiently in Xactimate.</td>
                        </tr>
                        <tr>
                          <td>Area</td>
                          <td>A</td>
                          <td>In the sketch tab, <a href="https://www.youtube.com/watch?v=EOkn9DDx3bU" target="_blank">press the A key</a> to activate the area tool. For external patches, such as a stucco patch, the area tool is highly useful and offers more functionality than the block tool in this context.</td>
                        </tr>
                        <tr>
                          <td>Toggle Sketch Tab Windows On/Off Individually</td>
                          <td>CTRL + Shift + 1/2/3/4</td>
                          <td>Press <b>CTRL + Shift</b> and hold them, then press 1 to open the Search window. To toggle other windows, use <b>CTRL + Shift + 2</b> for the Items window, <b>CTRL + Shift + 3</b> for the Symbols window, and <b>CTRL + Shift + 4</b> for the Images window. This allows you to <a href="https://www.youtube.com/watch?v=tBW3pBPnEoo" target="_blank">easily show or hide individual windows</a> in your sketch tab without manually clicking each one.</td>
                        </tr>
                        <tr>
                          <td>Reference Block</td>
                          <td>O</td>
                          <td><a href="https://www.youtube.com/watch?v=CwPkzhl39-I" target="_blank">Pressing O</a> on your keyboard will load your cursor with crosshairs. If you single-click on the left, nothing will happen. However, if you press <b>O</b> again, load up your cursor, then click and hold while dragging, you can create a block of any size you need.</td>
                        </tr>
                        <tr>
                          <td>Save a 3D View</td>
                          <td>Shift + V</td>
                          <td>After completing your sketch or ordering a two-sketch plus from Matterport, you may want to include a 3D view of the property at the end of your estimate. To do this, first press <b>3</b> to enter 3D mode, then press <b>Shift + V</b>. You'll be prompted to name the view—enter the name, hit <b>OK</b>, and <a href="https://www.youtube.com/watch?v=CwPkzhl39-I" target="_blank">the 3D view will be saved</a>.</td>
                        </tr>
                        <tr>
                          <td>CTRL for Create</td>
                          <td>CTRL</td>
                          <td><a href="https://www.youtube.com/watch?v=W-oiaViOeSg" target="_blank">CTRL is for Create</a>. If you've ever attended an Xactimate training class, you’ve likely heard this phrase—it’s even part of the Xactimate Certification Test. So, what does "CTRL is for Create" mean? When you hold down the <b>CTRL</b> key and drag the wall of a room in your sketch, it creates a new room based on those dimensions. This significantly speeds up your sketching process, making it much quicker to create new rooms.</td>
                        </tr>
                        <tr>
                          <td>Text</td>
                          <td>T</td>
                          <td>When you're in the Sketch tab, pressing the <b>T</b> key allows you <a href="https://www.youtube.com/watch?v=6RxcEE3Y7FE" target="_blank">to add text</a> and annotate your sketch. Simply hit the <b>T</b> key to load the text cursor. Then, click where you want to place the text, type your message, and hit <b>OK</b>. Once added, you can move the text around as needed.</td>
                        </tr>
                        <tr>
                          <td>Toggle Sketch Tab Windows On/Off</td>
                          <td>Shift + Enter</td>
                          <td>Sometimes when you're working in the Sketch tab, you may only want to focus on your sketch without the distraction of the windows on the left, such as the Search, Symbols, Items, and Images windows. To simplify your view, just hit <b>Shift + Enter</b> to toggle off these windows. Press <b>Shift + Enter</b> again, and they'll be restored.</td>
                        </tr>
                        <tr>
                          <td>Switch and Zoom to the Selected Room</td>
                          <td>Shift + Plus</td>
                          <td>If you hit <b>Shift + Plus</b>, it will <a href="https://www.youtube.com/watch?v=l8RDXOc6bio" target="_blank">zoom to the extent of the selected room</a>. This allows you to go straight to that room and zoom in automatically. This feature is particularly useful when you're zoomed in on another part of the sketch and want to quickly switch to the selected room without manually moving across the screen.</td>
                        </tr>
                        <tr>
                          <td>Copy from Underlay</td>
                          <td>U</td>
                          <td>The <b>U-Key</b> allows you to <a href="https://www.youtube.com/watch?v=osloti-gx6s" target="_blank">copy from Underlay</a> when you're in the SketchPad. If you have a room with two line items on the main level, switching to the second level will show the outline from below. Simply press the <b>U-Key</b> to activate the "Copy from Underlay" option, and it will pull up the room and line items from the lower level. You can also copy from the room above the current level in the same way.</td>
                        </tr>
                        <tr>
                          <td>Insert a Line Item</td>
                          <td>Insert</td>
                          <td>Sometimes, when you're reviewing your estimate, you may discover that you forgot to add a line item. Now you want to include it, but it can be tricky to figure out how to input that line item. Should you place it at the bottom and then drag it up to the correct position? Should you use the right-click to append or insert a line item? Fortunately, you can simply use the <a href="https://www.youtube.com/watch?v=ai1NIl7xaA0" target="_blank">Insert key to quickly add a line item</a> exactly where you want it.</td>
                        </tr>
                        <tr>
                          <td>Draw a Line</td>
                          <td>L</td>
                          <td>In Xactimate, you can draw a line to serve as a measuring tool or a reference point. While you can find this option in the tool section, there is a simple and easy-to-remember hotkey: <b>L</b>. <a href="https://www.youtube.com/watch?v=oZ7E79lnviE" target="_blank">L stands for "line."</a></td>
                        </tr>
                        <tr>
                          <td>Rename a Room</td>
                          <td>F2</td>
                          <td>When you drop a room into Xactimate, it comes with a preloaded name. Room 1, Room 2, or Room 3. <a href="https://www.youtube.com/watch?v=m1tadEwKdic" target="_blank">To rename a room quickly, simply click on it and hit the <b>F2</b> key</a>. This allows you to change the name without searching for it or navigating into the properties. Just click the room, press <b>F2</b>, change the name, and move on to the next one. When dealing with a sketch that has multiple rooms, this method allows you to rename them much more efficiently.</td>
                        </tr>
                        <tr>
                          <td>Annotate with Arrows</td>
                          <td>Forward Slash (/)</td>
                          <td>When you're sketching, especially in cases of water loss, annotating the sketch is a good idea to indicate the source of the issue. You can use the annotation tool to expedite this process. For instance, if you want to show that the water damage started in Room 1 and spread into Rooms 2 and 3, simply hit the forward slash key. This will change your cursor to a crosshair. Click and hold, then drag to <a href="https://www.youtube.com/watch?v=nM88jzPaguk" target="_blank">annotate with arrows</a>.</td>
                        </tr>
                        <tr>
                          <td>Break tool</td>
                          <td>B</td>
                          <td>The Break tool is arguably the most commonly used feature in sketching. You can find it under the Tools menu, labeled as "Break." However, there's a much quicker way to access it: just <a href="https://www.youtube.com/watch?v=gXKyCa8fBbE" target="_blank">press the B key</a>. This allows you to break your walls efficiently without navigating through the menu.</td>
                        </tr>
                        <tr>
                          <td>Open Macro in Sketch Tab</td>
                          <td>CTRL + Alt + M</td>
                          <td>If you click anywhere on the main level, outside any of the rooms you've sketched, and hit <b>CTRL + Alt + M</b>, it will <a href="https://www.youtube.com/watch?v=uw3TMMycLeo" target="_blank">bring up your Macro List</a>. You can run that macro, and it will apply to the main level. If you select the room itself and then hit <b>CTRL + Alt + M</b>, it will bring up your Macro List and run it specifically in that room. This allows you to graphically estimate super efficiently and incorporate all the macros you need in any particular room while staying in the Sketch tab.</td>
                        </tr>
                        <tr>
                          <td>Zoom to Extents</td>
                          <td>Shift + Minus</td>
                          <td>If you're zoomed in too far and aren't sure where you are or how far to zoom out, simply hit <b>Shift + Minus</b> to quickly <a href="https://www.youtube.com/watch?v=2MyRn5CcBhs" target="_blank">zoom to Extents</a>. This will display everything currently sketched on that level.</td>
                        </tr>
                        <tr>
                          <td>Bring Up the Ceiling Surface</td>
                          <td>Shift + C</td>
                          <td>If you enter 3D mode by pressing <b>3</b> and then simultaneously hit <b>Shift + C</b>, it will <a href="https://www.youtube.com/watch?v=dKIBq8CerCU" target="_blank">display the ceiling surfaces</a> for quick reference. While graphically estimating, you can add a line item from the ceiling, and if you hit <b>Shift + C</b> again, it will remove the ceiling surfaces from view.</td>
                        </tr>
                        <tr>
                          <td>SnapLines</td>
                          <td>S</td>
                          <td>The <b>S</b> key can be used to bring up a <a href="https://www.youtube.com/watch?v=MLA_oitIrOo" target="_blank">SnapLine in the Sketch tab of Xactimate</a>. When you hit <b>S</b> and drop it in the Sketch area, a SnapLine will appear. These are extremely helpful for quickly aligning elements within the Xactimate Sketch tab.</td>
                        </tr>
                        <tr>
                          <td>Cycle Through Roof Options</td>
                          <td>F + Spacebar</td>
                          <td>If you hit the <b>F</b> key, it will bring up the roof options. You can then use the <b>spacebar</b> to <a href="https://www.youtube.com/watch?v=98-33vAr2gU" target="_blank">cycle through the different types of roofs</a> available in Xactimate until you find the one you're looking for. This method allows you to draw more efficiently and enhances your roof sketching skills. By keeping your hands on the keyboard, you can streamline the process and improve your workflow when creating roof sketches.</td>
                        </tr>
                        <tr>
                          <td>Move Walls by Inch or Foot</td>
                          <td>CTRL/Shift + Arrow Keys</td>
                          <td>When moving a wall in Xactimate and you want to set it to exactly 17 feet, select the wall and hold <b>CTRL</b> while using the left and right arrow keys. This will move the wall by one inch. Similarly, if you hold <b>Shift</b> while using the arrow keys, it will move the wall by one foot. This allows you to quickly <a href="https://www.youtube.com/watch?v=Y4Rqo64LmsA" target="_blank">adjust the wall to the desired dimensions</a> using <b>CTRL</b> and <b>Shift</b>, rather than manually dragging it or entering a specific number.</td>
                        </tr>
                        <tr>
                          <td>Switch Between Views</td>
                          <td>1,2,3</td>
                          <td>The numbers <b>1</b>, <b>2</b>, and <b>3</b> on your keyboard correspond to <a href="https://www.youtube.com/watch?v=5xpuA1Wxok8" target="_blank">different views in Xactimate</a>. Pressing <b>1</b> will switch to Plan View, which provides a normal top-down 2D view while sketching. Pressing <b>2</b> brings up the Elevation View, allowing you to select an internal or external wall to view it individually with a red cursor. Finally, pressing <b>3</b> will take you to 3D View.</td>
                        </tr>
                        <tr>
                          <td>Rotating Object</td>
                          <td>Tab & Shift + Tab</td>
                          <td>You can <a href="https://www.youtube.com/watch?v=hTXpDmVtH48" target="_blank">rotate objects in Xactimate</a> using the <b>Tab</b> and <b>Shift + Tab</b> keys. For example, if you have a staircase that needs to be oriented differently, you can press <b>Tab</b> four times to rotate it 90 degrees (22.5 degrees per tab). If you want to rotate it back to its original position, hold <b>Shift</b> and press <b>Tab</b>. This allows you to adjust the angle of any object as needed.</td>
                        </tr>
                        <tr>
                          <td>Flooring Overlay and Orientation</td>
                          <td>Control + Shift + O & Backspace</td>
                          <td>If you press <a href="https://www.youtube.com/watch?v=tZFkSu-Umyw" target="_blank">Control + Shift + O</a> simultaneously, the flooring overlay will appear. Additionally, there is a hotkey to change the orientation of the flooring. While you can see the flooring orientation button in the interface, pressing the <b>Backspace</b> key will allow you to change the orientation and how it is cut out.</td>
                        </tr>
                        <tr>
                          <td>See the Measurements Without Selecting the Room</td>
                          <td>Shift + M</td>
                          <td>In Xactimate, you can’t view the measurements unless you click on the room itself, which can be inconvenient—especially in a testing environment when you need to see all the measurements to ensure everything is aligned and accurate. However, you can now <a href="https://www.youtube.com/watch?v=JY7o___MsRU" target="_blank">see the measurements without selecting the room</a>. Simply hold <b>Shift</b> and press <b>M</b>, and all the measurements for your rooms will be displayed.</td>
                        </tr>
                        <tr>
                          <td>See Properties of a Selected Area</td>
                          <td>CTRL + Enter</td>
                          <td>Holding <b>CTRL</b> and pressing <b>ENTER</b> simultaneously will open the properties of the selected room or level. This shortcut allows you to work more efficiently, enabling you to quickly view and modify any variables or dimensions associated with the selected area.</td>
                        </tr>
                        <tr>
                          <td>Move Through and Label Photos</td>
                          <td>Alt + N & Alt + P</td>
                          <td>You can press <b>Alt + N</b> to move to the next photo, and <b>Alt + P</b> to go back to the previous one. If you double-click a picture to enlarge it, these hotkeys become especially useful. They allow you to label photos much faster without having to click through or switch between the keyboard and mouse. Using <b>Alt + N</b> and <b>Alt + P</b> while navigating through photos will streamline your image labeling process.</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                  <div
                    className="mb-5"
                    id="tips-for-mastering-xactimate-shortcuts"
                  >
                  </div>
                  <div className="pb-5 pt-5"></div>
                  <h5 className="mt-5 mb-3"> Tips for Mastering Xactimate Shortcuts </h5>
                  <p className="mb-4"> While shortcuts are incredibly useful, many users find it challenging to learn and memorize them. Here are a few strategies to help you master Xactimate keyboard shortcuts and incorporate them seamlessly into your daily work: </p>
                  <p className="mb-2">
                    <strong>Start Small</strong>
                  </p>
                  <p className="mb-4"> Don’t overwhelm yourself by trying to learn all the shortcuts at once. Begin with a few essential commands that you use most frequently, such as shortcuts for navigation or editing. Once these become second nature, gradually add more to your repertoire. </p>
                  <p className="mb-2">
                    <strong>Repetition is Key</strong>
                  </p>
                  <p className="mb-4"> The more you use a shortcut, the easier it will be to remember. Practice using shortcuts regularly until they become part of your muscle memory. Over time, you’ll find that reaching for a shortcut becomes second nature. </p>
                  <p className="mb-2">
                    <strong>Use Cheat Sheets or Shortcut Guides</strong>
                  </p>
                  <p className="mb-4"> Keep a printed or digital list of Xactimate shortcuts handy as a reference. This will make it easier to look up shortcuts when you need them while working. </p>
                  <p className="mb-2">
                    <strong>Integrate Gradually into Workflow</strong>
                  </p>
                  <p style={{ marginBottom: "-144px" }}> As you grow more comfortable with keyboard shortcuts, start incorporating them into your regular workflow. Set specific goals, such as completing an estimate or sketch entirely using shortcuts for specific tasks. </p>
                  <div
                    className="mb-5"
                    id="become-a-master-xactimate-estimator"
                  >
                  </div>
                  <div className="pb-5 pt-5"></div>
                  <h5 className="mt-5 mb-3"> Become a Master Xactimate Estimator </h5>
                  <p className="mb-5"> Join our comprehensive course “<Link to="/actionable-xactimate-profile" target="_blank">Actionable Profile & Xact Best Practices</Link>” designed to turn attendees into experts in Xactimate best practices and the Actionable Xactimate Profile. This course covers the software’s history, future developments, and key features, providing a deep dive into how to maximize Xactimate’s potential for today’s estimators and claims professionals. </p>
                  <Link to="/actionable-xactimate-profile" target="_blank" className="btn">
                    Check it out now
                  </Link>
                  <h5 className="mt-5 mb-3"> In a nutshell </h5>
                  <p className="mb-5"> Keyboard shortcuts in Xactimate provide an invaluable boost to both speed and productivity. By starting with a few essential shortcuts and gradually mastering more over time, you’ll soon find yourself completing tasks more quickly and effortlessly. Whether you’re a new user or an experienced professional, incorporating keyboard shortcuts into your Xactimate routine will lead to smoother, faster project execution. </p>
                  <h5 className="mt-5 mb-3"> Have any questions? Feel free to ask. </h5>
                  <div className="row">
                    <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12">
                      <form onSubmit={handleSubmit}>
                        <div className="contact-us-form">
                          <div className="row">
                            <div className="col-sm-6 col-xs-12">
                              <div className="form-group">
                                <label> First Name </label> 
                                <b 
                                  style={{
                                    color: "red",
                                    fontSize: "25px",
                                    marginLeft: "-5px",
                                  }}
                                >
                                  *
                                </b>
                                <input
                                  type="text"
                                  name="firstName"
                                  className="form-control"
                                  placeholder="Enter"
                                  required
                                  value={userData.firstName}
                                  onChange={(e) =>
                                    setUserData({
                                      ...userData,
                                      firstName: e.currentTarget.value,
                                    })
                                  }
                                />
                              </div>
                            </div>
                            <div className="col-sm-6 col-xs-12">
                              <div className="form-group">
                                <label> Last Name </label> 
                                <b 
                                  style={{
                                    color: "red",
                                    fontSize: "25px",
                                    marginLeft: "-5px",
                                  }}
                                >
                                  *
                                </b>
                                <input
                                  type="text"
                                  name="lastName"
                                  className="form-control"
                                  placeholder="Enter"
                                  required
                                  value={userData.lastName}
                                  onChange={(e) =>
                                    setUserData({
                                      ...userData,
                                      lastName: e.currentTarget.value,
                                    })
                                  }
                                />
                              </div>
                            </div>
                          </div>
                          <div className="row">
                            <div className="col-sm-6 col-xs-12">
                              <div className="form-group">
                                <label> Your Email </label>
                                <b 
                                  style={{
                                    color: "red",
                                    fontSize: "25px",
                                    marginLeft: "-5px",
                                  }}
                                >
                                  *
                                </b>
                                <input
                                  type="email"
                                  name="email"
                                  className="form-control"
                                  placeholder="Enter"
                                  required
                                  value={userData.youremail}
                                  onChange={(e) =>
                                    setUserData({
                                      ...userData,
                                      youremail: e.currentTarget.value,
                                    })
                                  }
                                />
                              </div>
                            </div>
                            <div className="col-sm-6 col-xs-12">
                              <div className="form-group">
                                <label> Your Phone Number </label>
                                <b 
                                  style={{
                                    color: "red",
                                    fontSize: "25px",
                                    marginLeft: "-5px",
                                  }}
                                >
                                  *
                                </b>
                                <InputMask
                                  mask="999-999-9999"
                                  value={userData.yourphone}
                                  onChange={(e) =>
                                    setUserData({
                                      ...userData,
                                      yourphone: e.currentTarget.value,
                                    })
                                  }
                                >
                                  {(inputProps) => (
                                    <input
                                      type="text"
                                      name="phone"
                                      className="form-control"
                                      placeholder="Enter"
                                      required
                                      {...inputProps}
                                    />
                                  )}
                                </InputMask>
                              </div>
                            </div>
                          </div>
                          <div className="row">
                            <div className="col-sm-6 col-xs-12 mt-2">
                              <div className="form-group">
                                <label> Subject </label>
                                <input
                                  type="text"
                                  name="subject"
                                  className="form-control"
                                  placeholder="Enter"
                                  value={userData.subject}
                                  onChange={(e) =>
                                    setUserData({
                                      ...userData,
                                      subject: e.currentTarget.value,
                                    })
                                  }
                                />
                              </div>
                            </div>
                            <div className="col-sm-6 col-xs-12 mt-2">
                              <div className="form-group">
                                <label> Upload Image (Optional) </label> 
                                <label className="file">
                                  <input
                                    type="file"
                                    accept="image/png, image/jpg, image/jpeg"
                                    onChange={fileChange}
                                    onClick={(e) => (e.target.value = null)}
                                  />
                                  <img
                                    className="input_icon"
                                    src={download}
                                    alt="download"
                                    loading="lazy"
                                  />
                                  <span className="file-custom"> Select </span>
                                </label>
                                {file && (
                                  <>
                                    {isError ? (
                                      <div className="image-error">
                                        Oops. Please upload your image as a PNG or JPG.
                                      </div>
                                    ) : (
                                      <div className="image-name">
                                        {"   " + file.name}
                                      </div>
                                    )}
                                  </>
                                )}
                              </div>
                            </div>
                          </div>
                          <div className="row">
                            <div className="col mt-2">
                              <div className="form-group">
                                <label> Your Message </label>
                                <textarea
                                  name="your-message"
                                  className="form-control"
                                  style={{ height: "200px" }}
                                  placeholder="Enter"
                                  value={userData.message}
                                  onChange={(e) =>
                                    setUserData({
                                      ...userData,
                                      message: e.currentTarget.value,
                                    })
                                  }
                                />
                              </div>
                            </div>
                          </div>
                          <div className="row">
                            <div className="col">
                            <ReCAPTCHA
                              sitekey="6LcGHDwoAAAAAEEwh5SAw7fWnY_SnzYMF68EFKUx"
                              size="normal"
                              onChange={onChange}
                            />
                            </div>
                          </div>
                          <div className="send">
                            {!loading && (
                              <button
                                className="btn"
                                type="submit"
                                disabled={isError ? true : verified ? false : true}
                              >
                                Send
                              </button>
                            )}
                            {loading && (
                              <button className="btn" disabled> 
                                <i className="fas fa-spinner fa-spin"></i>
                              </button>
                            )}
                          </div>
                          {Msg && (
                            <div 
                              style={{
                                display: "block",
                                fontSize: "15px",
                                margin: "20px 0px",
                                padding: "10px",
                                border: "2px solid #398f14",
                                borderRadius: "4px",
                              }}
                            >
                              {Msg}
                            </div>
                          )}
                        </div>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
            </div>
					</div>
				</div>
				<WrongBrowserDisclaimer />
				<CookieConsentGI2 />
				<Footer />
			</Suspense>
		</>
	);
};

export default withRouter(KeyboardShortcutsForXactimate);