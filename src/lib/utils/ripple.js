/**
 * Create a ripple action
 * @typedef {{ event?: string; transition?: number; zIndex?: string; rippleColor?: string; disabled?: boolean }} Options
 * @param {Element} node
 * @param {Options} [options={}]
 * @returns {{ destroy: () => void; update: (options?: Options) => void }}
 */
export default function ripple(node, options = {}) {
  // Default values.
  const props = {
    event: options.event || 'click',
    transition: options.transition || 150,
    zIndex: options.zIndex || '100',
    bg: options.rippleColor || null,
    disabled: options.disabled || false,
  };

  const handler = event => rippler(event, node, props);

  if (!props.disabled) {
    node.addEventListener(props.event, handler);
  }

  function rippler(event, target, { bg, zIndex, transition }) {
    // Get border to avoid offsetting on ripple container position
    const targetBorder = parseInt(
      getComputedStyle(target).borderWidth.replace('px', '')
    );

    // Get necessary variables
    const rect = target.getBoundingClientRect(),
      left = rect.left,
      top = rect.top,
      width = target.offsetWidth,
      height = target.offsetHeight,
      dx = event.clientX - left,
      dy = event.clientY - top,
      maxX = Math.max(dx, width - dx),
      maxY = Math.max(dy, height - dy),
      style = window.getComputedStyle(target),
      radius = Math.sqrt(maxX * maxX + maxY * maxY),
      border = targetBorder > 0 ? targetBorder : 0;

    // Create the ripple and its container
    const ripple = document.createElement('div');
    const rippleContainer = document.createElement('div');
    rippleContainer.className = 'ripple-container';
    ripple.className = 'ripple';

    // Styles for the ripple
    ripple.style.marginTop = '0px';
    ripple.style.marginLeft = '0px';
    ripple.style.width = '1px';
    ripple.style.height = '1px';
    ripple.style.transition = `all ${transition}ms cubic-bezier(0.4, 0, 0.2, 1)`;
    ripple.style.borderRadius = '50%';
    ripple.style.pointerEvents = 'none';
    ripple.style.position = 'relative';
    ripple.style.zIndex = zIndex;
    if (bg !== null) {
      ripple.style.backgroundColor = bg;
    }

    // Styles for the rippleContainer
    rippleContainer.style.position = 'absolute';
    rippleContainer.style.left = 0 - border + 'px';
    rippleContainer.style.top = 0 - border + 'px';
    rippleContainer.style.height = '0';
    rippleContainer.style.width = '0';
    rippleContainer.style.pointerEvents = 'none';
    rippleContainer.style.overflow = 'hidden';

    // Store target position to change it after
    const storedTargetPosition =
      target.style.position.length > 0
        ? target.style.position
        : getComputedStyle(target).position;
    // Change target position to relative to guarantee ripples correct positioning
    if (
      storedTargetPosition !== 'relative' &&
      storedTargetPosition !== 'absolute'
    ) {
      target.style.position = 'relative';
    }

    rippleContainer.appendChild(ripple);
    target.appendChild(rippleContainer);

    ripple.style.marginLeft = dx + 'px';
    ripple.style.marginTop = dy + 'px';

    rippleContainer.style.width = width + 'px';
    rippleContainer.style.height = height + 'px';
    rippleContainer.style.borderTopLeftRadius = style.borderTopLeftRadius;
    rippleContainer.style.borderTopRightRadius = style.borderTopRightRadius;
    rippleContainer.style.borderBottomLeftRadius = style.borderBottomLeftRadius;
    rippleContainer.style.borderBottomRightRadius =
      style.borderBottomRightRadius;
    rippleContainer.style.direction = 'ltr';

    setTimeout(() => {
      ripple.style.width = radius * 2 + 'px';
      ripple.style.height = radius * 2 + 'px';
      ripple.style.marginLeft = dx - radius + 'px';
      ripple.style.marginTop = dy - radius + 'px';
    }, 0);

    function clearRipple() {
      setTimeout(() => {
        ripple.style.backgroundColor = 'rgba(0, 0, 0, 0)';
      }, 250);

      // Timeout set to get a smooth removal of the ripple
      setTimeout(() => {
        rippleContainer.parentNode.removeChild(rippleContainer);
      }, transition + 250);

      // After removing event set position to target to it's original one
      // Timeout it's needed to avoid jerky effect of ripple jumping out parent target
      setTimeout(() => {
        let clearPosition = true;
        for (let i = 0; i < target.childNodes.length; i++) {
          if (target.childNodes[i].className === 'ripple-container') {
            clearPosition = false;
          }
        }

        if (clearPosition) {
          if (storedTargetPosition !== 'static') {
            target.style.position = storedTargetPosition;
          } else {
            target.style.position = '';
          }
        }
      }, transition + 250);
    }

    clearRipple();
  }

  return {
    destroy() {
      node.removeEventListener(props.event, handler);
    },
    update(newProps = {}) {
      if (newProps.disabled) {
        node.removeEventListener(props.event, handler);
      } else {
        node.addEventListener(props.event, handler);
      }
    },
  };
}
