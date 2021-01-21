export enum CardType {
    EVENT = 'event',
    ACTIVE = 'active',
    AUTOMATED = 'automated',
    PRELUDE = 'prelude',
    CORPORATION = 'corporation',
    STANDARD_PROJECT = 'standard_project',
    // Proxy cards are not real cards, but for operations that need a card-like behavior.
    PROXY = 'proxy',
}
