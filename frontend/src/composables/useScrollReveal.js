import { onMounted, onUnmounted } from 'vue'

/**
 * Composable that adds scroll-reveal animations using IntersectionObserver.
 * Elements with [data-reveal] attribute will animate in when scrolled into view.
 * 
 * Supports:
 *   data-reveal="fade-up" | "fade-down" | "fade-left" | "fade-right" | "zoom" | "flip"
 *   data-reveal-delay="100" (ms)
 *   data-reveal-duration="600" (ms)
 */
export function useScrollReveal() {
  let observer = null

  const initObserver = () => {
    observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const el = entry.target
            const delay = el.dataset.revealDelay || 0
            const duration = el.dataset.revealDuration || 600

            el.style.transitionDuration = `${duration}ms`

            setTimeout(() => {
              el.classList.add('revealed')
            }, Number(delay))

            observer.unobserve(el)
          }
        })
      },
      {
        threshold: 0.08,
        rootMargin: '0px 0px -40px 0px',
      }
    )

    document.querySelectorAll('[data-reveal]').forEach((el) => {
      el.classList.add('reveal-hidden')
      observer.observe(el)
    })
  }

  onMounted(() => {
    // Use nextTick-like delay to ensure DOM is fully rendered
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        initObserver()
      })
    })
  })

  onUnmounted(() => {
    if (observer) {
      observer.disconnect()
    }
  })
}
