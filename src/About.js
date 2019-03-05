import React, { Component } from 'react';
class About extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div id="about">

        <p>
        Thanks for checking out the <em>Paleographinator</em>.
        The Paleographinator is designed to take advantage
        of the ongoing global work
        to transcribe medieval manuscripts and create
        editions of medieval texts. </p>

        <p>While this data is often being created primarily
        to appear as a document on a printed page or web page,
        when this data is thoughtfully created first as semantically encoded data,
        it can be aggregated by
        <a href="https://scta.info/resource">Scholastic Commentaries and Texts Achive</a>,
        and made available for re-use.</p>

        <p>This particular application recombines data organized by the SCTA,
         and presents it in a way that makes it easy to compare
         text abbreviations against other instances.</p>

         <p>Watch a brief demo here:</p>
         <iframe class="youtube" width="560" height="315" src="https://www.youtube.com/embed/gdfncaR0eu4" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

         <p>The app and the data coming from the SCTA are still very much under development,
         so, while it is already useful, you will find
         mismatching images and text.
         However, as work on text editions continues,
         so will the quality of the search results.
         </p>

         <p>If you want to report an issue or feature request, please do so here
         <a href="https://github.com/lombardpress/paleographinator/issues">https://github.com/lombardpress/paleographinator/issues</a>
         </p>




      </div>
    );
  }
}

export default About;
