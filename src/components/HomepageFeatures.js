import React from 'react';
import clsx from 'clsx';
import styles from './HomepageFeatures.module.css';

const FeatureList = [
  {
    title: '对待技术',
    Svg: require('../../static/img/undraw_docusaurus_mountain.svg').default,
    description: (
      <>
        前期追深度，后期追求广度
      </>
    ),
  },
  {
    title: '对待生活',
    Svg: require('../../static/img/undraw_docusaurus_tree.svg').default,
    description: (
      <>
        健康、生活、好心情、从容、家庭
      </>
    ),
  },
  {
    title: '对待学习',
    Svg: require('../../static/img/undraw_docusaurus_react.svg').default,
    description: (
      <>
        技术之路最公平也最残酷的原因是：没有捷径，需要日积月累，以及持久的热情。
      </>
    ),
  },
];

function Feature({Svg, title, description}) {
  return (
    <div className={clsx('col col--4')}>
      <div className="text--center">
        <Svg className={styles.featureSvg} alt={title} />
      </div>
      <div className="text--center padding-horiz--md">
        <h3>{title}</h3>
        <p>{description}</p>
      </div>
    </div>
  );
}

export default function HomepageFeatures() {
  return (
    <section className={styles.features}>
      <div className="container">
        <div className="row">
          {FeatureList.map((props, idx) => (
            <Feature key={idx} {...props} />
          ))}
        </div>
      </div>
    </section>
  );
}
