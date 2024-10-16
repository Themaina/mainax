import styles from './servicecards.module.scss'; // Your CSS module for services

export default function ServiceCards({ services }) {
  const sortedServices = services.sort((a, b) => a.popularity - b.popularity);

  return (
    <div className={styles.servicesContainer}>
      {sortedServices.map((service, index) => (
        <div key={index} className={styles.serviceCard}>
          <h2 className={styles.serviceTitle}>{service.name}</h2>
          <p className={styles.serviceDescription}>{service.description}</p>
          <button className={styles.learnMoreBtn}>Learn More</button>
        </div>
      ))}
    </div>
  );
}
