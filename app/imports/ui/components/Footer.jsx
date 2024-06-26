import React from 'react';
import { Image } from 'react-bootstrap';

const Footer = () => (
  <footer className="text-center text-lg-start text-white mt-auto" style={{ backgroundColor: '#1c2331' }}>
    <section className="d-flex justify-content-between p-3" style={{ backgroundColor: '#00502f' }}>
      <div className="me-5" style={{ height: 25 }} />

      {/* <div>
          <a href="" class="text-white me-4">
              <i class="fab fa-facebook-f"></i>
          </a>
          <a href="" class="text-white me-4">
              <i class="fab fa-twitter"></i>
          </a>
          <a href="" class="text-white me-4">
              <i class="fab fa-google"></i>
          </a>
          <a href="" class="text-white me-4">
              <i class="fab fa-instagram"></i>
          </a>
          <a href="" class="text-white me-4">
              <i class="fab fa-linkedin"></i>
          </a>
          <a href="" class="text-white me-4">
              <i class="fab fa-github"></i>
          </a>
      </div> */}
    </section>

    <section className="">
      <div className="container text-center text-md-start mt-5">
        <div className="row mt-3">
          <div className="col-md-3 col-lg-4 col-xl-3 mx-auto mb-4">
            <h6 className="text-uppercase fw-bold">University of Hawaiʻi at Manoa </h6>
            <hr className="mb-4 mt-0 d-inline-block mx-auto" style={{ width: 60, height: 2, backgroundColor: '#7c4dff' }} />
            <p>
              <Image src="https://manoa.hawaii.edu/wp/wp-content/uploads/2017/10/uhm-white-seal-nameplate@2x.png" width={250} />
            </p>
          </div>

          <div className="col-md-2 col-lg-2 col-xl-2 mx-auto mb-4">
            <h6 className="text-uppercase fw-bold">Quick Links</h6>
            <hr className="mb-4 mt-0 d-inline-block mx-auto" style={{ width: 60, height: 2, backgroundColor: '#7c4dff' }} />
            <p>
              <a href="/" rel="noopener noreferrer" className="text-white">Home</a>
            </p>
            <p>
              <a href="/list" rel="noopener noreferrer" className="text-white">Lost Items</a>
            </p>
          </div>

          <div className="col-md-4 col-lg-3 col-xl-3 mx-auto mb-md-0 mb-4">
            <h6 className="text-uppercase fw-bold">Contact</h6>
            <hr className="mb-4 mt-0 d-inline-block mx-auto" style={{ width: 60, backgroundColor: '#7c4dff' }} />
            <p><i className="bi bi-house-fill" /> 2500 Campus Road</p>
            <p>&nbsp;&nbsp;&nbsp;&nbsp; Honolulu, HI 96822</p>
            <p><i className="bi bi-envelope-fill" /> lostandfound@hawaii.edu</p>
          </div>
        </div>
      </div>
    </section>
    <div
      className="text-center p-3"
      style={{ backgroundColor: '#00502f' }}
    >
      © 2020 Copyright: UHM Lost and Found
    </div>
  </footer>
);

export default Footer;
