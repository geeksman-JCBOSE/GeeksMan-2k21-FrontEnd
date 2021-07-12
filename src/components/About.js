import React from "react";
import "./utils/utils.css";
import image from "./images/image.jpeg";
import MemberCard from "./utils/About-memberscard";
import DevCard from "./utils/Developers-card";
import Navbar from "./Navbar";
import Coordinators from "./utils/coordinators";
import Events from "./utils/events";
import image1 from "./images/png/komal bhatia.jpg";
import image2 from "./images/png/neelam.jpeg";
import bbop from "./images/png/bbop.png";
import geeky from "./images/png/geekymondays.jpg";
import machine from "./images/png/machine.jpg";
import deepdive from "./images/png/deepdive.PNG";
import codef2 from "./images/png/codefury2.png";
import codef3 from "./images/png/codefury3.PNG";
import pecfest from "./images/png/pecfest.PNG";
import acstreak from "./images/png/acstreak.PNG";
import Aayush from './images/png/aayush.jpg'
import Dinesh from './images/png/dinesh.jpg'
import Vineet from './images/png/vineet.PNG'
import nitika from './images/png/nitika.PNG'
import rishabh from './images/png/rishabh.PNG'
import ritik from './images/png/ritik.PNG'
import sahil from './images/png/sahil singla.jpg'
import trilok from './images/png/trilok kaushik.jpg'
import manmeet from './images/png/manmeet.jpg'
import { connect } from "react-redux";
import * as actions from "../store/actions/index";

const About = (props) => {
  React.useEffect(() => {
    props.getMember();
  });
  return (
    <div className="aboutpage">
      <div className="about-navbar-part">
        <Navbar />
      </div>
      <div className="about__us-head">
        <h1>About Us</h1>
        <span>
          This is our team, a lot of smiling happy people who work hard to
          empower geeksman.
        </span>
      </div>

      <div className="video-text-part">
        <div className="videoarea">
          <iframe
            src="https://www.youtube.com/embed/_0cfRsPI4xQ"
            frameborder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowfullscreen
          ></iframe>
        </div>
        <div className="textpart">
          <p>
            Well, our name tells all about us, we are the geeks, who love to
            code!!. Infact,we bleed code! Sounds geeky ? Welcome to Geeksman,
            official coding club of JCBUST, Faridabad. Geeksman is all about
            nourishing your coding skills and is highly biased towards promoting
            coding culture in the campus. Previously it was a part of Codechef
            campus chapter later on it has been approved as an official coding
            club of YMCA. Coding Contests, Hackathons are the primary siblings
            of Geeksman.
          </p>
        </div>
      </div>

      <div className="events__heading">
        <h1>Our Events</h1>
      </div>
      <div className="events__content">
        <Events
          image={bbop}
          eventname={"Building Blocks Of Programming"}
          description={
            "Geeksman, the official coding society of The Department of Computer Engineering of JC Bose University of Science and Technology under TEQIP-III conducted the inauguration ceremony of an extraordinary value added course BUILDING BLOCKS OF PROGRAMMING one of the biggest event of 2021. The ceremony was inaugurated by Professor Dinesh Kumar the Vice Chancellor of JC BOSE UST, YMCA in the presence of Professor Sunil Kumar Garg, Worthy Registrar JCBOSE UST, YMCA , Professor Komal Kumar Bhatia, dean department of Informatics and Computing"
          }
          date={"11 January - 25 January 2021"}
        />
        <Events
          image={geeky}
          eventname={"Geeky Mondays"}
          description={
            "𝐆𝐞𝐞𝐤𝐲 𝐌𝐨𝐧𝐝𝐚𝐲𝐬: 𝐓𝐡𝐞 𝐞𝐯𝐞𝐧𝐭 𝐛𝐲 𝐆𝐞𝐞𝐤𝐬𝐌𝐚𝐧 𝐭𝐨 𝐭𝐞𝐬𝐭 𝐜𝐨𝐝𝐢𝐧𝐠 𝐬𝐤𝐢𝐥𝐥𝐬 𝐨𝐟 𝐬𝐭𝐮𝐝𝐞𝐧𝐭𝐬 Geeksman, the technical coding club of J. C. Bose University of Science and Technology, YMCA has started Geeky Mondays during Jan-Feb 2021, a series of Questionnaire to try and test coding skills and knowledge of students of the university. Questions will be posted every Monday on Instagram handle of GeeksMan. The lucky geeks will get featured on the official page of Geeksman society!!"
          }
          date={"4 January - 22 February 2021"}
        />
        <Events
          image={codef2}
          eventname={"code Fury 2.0"}
          description={
            "GEEKSMAN, The Technical club of CE department always focuses on encouraging students to code, so to encourage this, GeeksMan conducted a contest Code Fury 2.0Code Fury 2.0 is the signature event of GeeksMan. This time Code Fury was specially designed for First Year students. The event took place on Hacker Rank on 27 June 2020 at 9 PM till 12 AM. The event had huge participation of the newbies. "
          }
          date={"27 June 2020"}
        />
        <Events
          image={machine}
          eventname={"Machine Learning Session"}
          description={
            "GeeksMan, the Technical club of CE department of JC BOSE University of Science and Technology YMCA, Faridabad, believes in developing skills because only skills can remain with us till the end, so to gain skills GeeksMan conducted a workshop on how to make computer sound like a person with text being auto-generated. In this session, students made a small project that didn’t use neural networks to generate text, rather used Yelp Reviews to generate new reviews using Markov Chains. "
          }
          date={"19 September 2019"}
        />
        <Events
          image={codef3}
          eventname={"code Fury 3.0"}
          description={
            "Programming isn't about what you know; it's about what you can figure out.” *‼️Greetings Coders‼️Quarentine has been a great opportunity for learners to lift up their skills. But what is the use, if you can't show and perform with them??To test and show your coding skills, *Geeksman*, the official technical club of CE department of *JC Bose University of science and technology, YMCA*, with immense pleasure brings to you a adrenaline - fueled coding battle aka *CODEFURY 3.0* where coders compete to solve problems and win exciting prizes."
          }
          date={"6 September 2020"}
        />
        <Events
          image={deepdive}
          eventname={"Deep Dive Into Graphs"}
          description={
            "Event began with the motivational speech of honourable V.C. sir, Prof. Dinesh Kumar. Mr. Pranav Khandelwal and Jatin Virmani were mentors of that event.Our department’s chairman Dr.Komal Bhatia and club Co-ordinator Dr.Neelam Duhan were also there to guide students with their high experienceThis informative session started with basics of graphs and some standard problems were discussed. More than 100 students attended the event and they were really appreciating the event.Those students who answered correctly to the questions asked by mentors were appreciated by giving them goodies(t-shirts,pens,etc.) by our club"
          }
          date={"23 October 2020"}
        />
        <Events
          image={pecfest}
          eventname={"PecFest"}
          description={
            "Geeksman (Technical club of Computer Department), mark their presence in the technical fest of Punjab Engineering College (PEC), Chandigarh by getting selected for the hackathon in online screening round. PECFEST was held on 8th November,2019 – 10th November,2019.10 members from the club take part and represent our university in different events held there and even won the third position in the hackathon held there.They provide us chargeable accommodation, food, etc. for three days."
          }
          date={"6 November 2019"}
        />
        <Events
          image={acstreak}
          eventname={"AC Streak"}
          description={
            "GeeksMan, the technical club of Computer Engineering department of J.C. Bose University of Science and Technology YMCA, Faridabad organized an intra college coding contest AC STREAK on 12th January 2020. The prime motive was to let the newbies showcase their programming skills and boost their confidence. Students showed their great interest and put their efforts to crack and win the contest. Many students participated in the contest out of which Sanyam from CE 2nd year and Kushagra from CE 1st year secured 1st position."
          }
          date={"12 June 2020"}
        />
      </div>
      <div className="faculty__coordinators">
        <h1>Faculty Co-ordinators</h1>
      </div>
      <div className="faculty__content">
        <Coordinators
          image={image2}
          name="Dr. Neelam Duhan"
          post="Director digital cell, Club Coordinator Geeksman"
        />
        <Coordinators
          image={image1}
          name="Dr. Komal Kumar Bhatia"
          post="Chairperson Computer Engineering dept"
        />
      </div>
      <div className="faculty__coordinators">
        <h1>Our Founders</h1>
      </div>
      <div className="faculty__content">
        <Coordinators
          image={sahil}
          name="Sahil Singla"
          post="Amazon"
        />
        <Coordinators
          image={trilok}
          name="Trilok Kaushik"
          post="Samsung"
        />
        <Coordinators
          image={manmeet}
          name="Manmeet"
          post="Amazon"
        />
      </div>
      <div className="our__members">
        <h1>Our Leads</h1>
        <div className="faculty__content">
          <Coordinators
            image={Vineet}
            name="Vineet Rathee"
            post="Secretary"
          />
          <Coordinators
            image={ritik}
            name="Ritik Chauhan"
            post="Secretary"
          />
          <Coordinators
            image={Dinesh}
            name="Dinesh Duhan"
            post="Secretary"
          />
        </div>
       
        <div className="faculty__content">
          <Coordinators
            image={Aayush}
            name="Aayush Tyagi"
            post="Joint Secretary"
          />
          <Coordinators
            image={nitika}
            name="Nitika Bansal"
            post="Joint Secretary"
          />
          <Coordinators
            image={rishabh}
            name="Rishabh Gupta"
            post="Joint Secretary"
          />
        </div>
        <h1>Our Members</h1>
        <MemberCard />
      </div>
      <div className="developers">
        <h1>Developers</h1>
      </div>
      <div className="developer__content">
        <DevCard
          name="Aayush Tyagi"
          stack="Fullstack Developer"
          image={Aayush}
        />
        <DevCard
          name="Parag Thakur"
          stack="Fullstack Developer"
          image={image}
        />
        <DevCard
          name="Shubham Bansal"
          stack="Backend Developer"
          
        />
        
      </div>
    </div>
  );
};

const mapDispatchToProps = (dispatch) => {
  return {
    getMember: () => {
      dispatch(actions.getMember());
    },
    
  };
};



export default connect(null,mapDispatchToProps)(About);
