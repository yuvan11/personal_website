import React from 'react';
import { getAssetUrl } from '../utils/assetHelper';

const swagItems = [
  {
    title: 'Beautiful Cap',
    subtitle: 'Prisma and MongoDb',
    image: 'assets/images/swags/sw-1.jpg',
    link: 'https://x.com/yuvaraj_11_/status/1534738342796873728',
    date: 'July 9, 2022',
  },
  {
    title: 'HacktoberFest 2022',
    subtitle: 'Hacktoberfest sponsors',
    image: 'assets/images/swags/sw-2.jpg',
    link: 'https://x.com/yuvaraj_11_/status/1542864789952942080',
    date: 'Feb, 2022',
  },
  {
    title: 'Prisma Stickers',
    subtitle: 'Prisma and NextJS',
    image: 'assets/images/swags/sw-3.jpg',
    link: 'https://x.com/yuvaraj_11_/status/1456879544900616196',
    date: 'Nov 6, 2021',
  },
  {
    title: 'Jfrog T-Shirt',
    subtitle: 'J-Frog',
    image: 'assets/images/swags/sw-4.jpg',
    link: 'https://x.com/yuvaraj_11_/status/1439260019636064260',
    date: 'Sep 18, 2021',
  },
  {
    title: 'Water Bottle',
    subtitle: 'Gatsby and Shopify',
    image: 'assets/images/swags/sw-5.jpg',
    link: 'https://x.com/yuvaraj_11_/status/1429295387781697537',
    date: 'Aug 22, 2021',
  },
  {
    title: 'RedwoodJs Stickers',
    subtitle: 'RedwoodJS',
    image: 'assets/images/swags/sw-6.jpg',
    link: 'https://x.com/yuvaraj_11_/status/1423898327637135364',
    date: 'Aug 7, 2021',
  },
  {
    title: 'Google Cloud Ready',
    subtitle: 'Google',
    image: 'assets/images/swags/sw-7.jpg',
    link: 'https://x.com/yuvaraj_11_/status/1571771768934924288',
    date: 'Sep 19, 2022',
  },
];

const Swags = () => {
  return (
    <section id="swags" className="sw-area">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-lg-8">
            <div className="section-title text-center">
              <h2 className="title">Swags &amp; Milestones</h2>
              <p>Collection of achievement swags posted on X (Twitter)</p>
            </div>
          </div>
        </div>
        <div className="row justify-content-center">
          {swagItems.map((swag) => (
            <div className="col-lg-3 col-md-4 col-sm-4" key={swag.title}>
              <div className="single-sw mt-30">
                <div className="sw-image">
                  <img src={getAssetUrl(swag.image)} alt={swag.title} />
                </div>
                <div className="sw-content">
                  <h4 className="sw-title">
                    <a href={swag.link} target="_blank" rel="noreferrer">
                      {swag.title}
                      <span>{swag.subtitle}</span>
                    </a>
                  </h4>
                  <div className="sw-footer" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '0.4rem' }}>
                    <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>{swag.date}</span>
                    <a href={swag.link} target="_blank" rel="noreferrer" style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }} title="View on X">
                      <i className="fa-brands fa-x-twitter"></i>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Swags;