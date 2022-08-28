import { useLayoutEffect } from 'react';
import createOnceUpdateEffect from '../createOnceUpdateEffect';

export default createOnceUpdateEffect(useLayoutEffect);
