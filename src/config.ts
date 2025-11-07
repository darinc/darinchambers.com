/**
 * Application configuration and feature flags
 *
 * Feature flags allow gradual rollout of new functionality and easy rollback if issues arise.
 */
export const config = {
  features: {
    /**
     * Use the 'marked' library for markdown rendering instead of the custom MarkdownRenderer
     *
     * - false (default): Uses custom MarkdownRenderer (proven, tested, lightweight)
     * - true: Uses marked library (CommonMark compliant, battle-tested, larger bundle)
     *
     * Toggle this flag to switch between renderers. Both implementations maintain the same API.
     */
    useMarkedRenderer: true,
  },
} as const;
