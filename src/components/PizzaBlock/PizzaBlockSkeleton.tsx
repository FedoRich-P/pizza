import ContentLoader from 'react-content-loader';

export const PizzaBlockSkeleton = () => (
  <ContentLoader speed={3}
                 width={290}
                 height={525}
                 viewBox="0 0 290 525"
                 backgroundColor="#e6e6e6"
                 foregroundColor="#e18e56"
                 className={'pizza-block'}
  >
    <rect x="473" y="252" rx="3" ry="3" width="67" height="11" />
    <rect x="541" y="287" rx="3" ry="3" width="140" height="11" />
    <rect x="0" y="267" rx="8" ry="8" width="256" height="30" />
    <rect x="494" y="215" rx="3" ry="3" width="72" height="19" />
    <rect x="0" y="315" rx="8" ry="8" width="256" height="92" />
    <rect x="4" y="427" rx="3" ry="3" width="85" height="30" />
    <rect x="597" y="318" rx="3" ry="3" width="140" height="11" />
    <rect x="511" y="315" rx="3" ry="3" width="173" height="11" />
    <circle cx="125" cy="125" r="125" />
    <rect x="100" y="421" rx="3" ry="3" width="153" height="43" />
  </ContentLoader>
);