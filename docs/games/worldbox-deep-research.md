
# WorldBox - God Simulator: 深度调研原始报告合集

> **研究时间**：2026-02-02
> **研究者**：面包 (Bread)
> **说明**：本笔记包含了本次调研产生的 4 份原始报告全文，包括综合总结、技术深挖、市场分析及社区生态。


## 🛠 报告二：技术深挖 (Technical Deep Dive)

# Technical Deep Dive: WorldBox - God Simulator

This document provides a technical overview of the implementation strategies used in **WorldBox - God Simulator**, developed by Maxim Karpenko. The analysis focuses on performance optimizations, AI architecture, world generation, and data management within the Unity engine.


## 2. Pathfinding and AI Logic

WorldBox manages pathfinding for thousands of units simultaneously across complex, destructible terrain.

### **Hierarchical Pathfinding (HPA*)**
*   **Region-Based Navigation:** The map is divided into "Regions" (clusters of tiles). The pathfinder first calculates a high-level path between regions and then a low-level path within the specific region. This reduces the search space of the A* algorithm by several orders of magnitude.
*   **Static Pre-calculation:** Navigation data is pre-calculated per "island" or landmass. When the user modifies the terrain (e.g., creating a bridge or destroying a peninsula), the game triggers a localized re-calculation of regional connections.
*   **Flow Fields (Potential Lead):** For massive group movements (armies), the game likely uses **Flow Fields** (Vector Fields), where a single pathfinding calculation generates a "force map" that all units in the group follow, rather than each unit calculating its own path.

### **AI Behavior Architecture**
*   **Modular "World Behaviors":** AI is driven by a library of behaviors (e.g., `SettlerBehavior`, `WarriorBehavior`).
*   **Trait System:** Behaviors are modified by a "Trait" system that applies modifiers to base logic (e.g., the "Madness" trait overrides standard social behavior with aggressive/chaotic states).


## 4. Saving/Loading Mechanics

Large worlds with millions of data points require an efficient serialization strategy.

### **Binary Serialization (.wbox)**
*   **Custom Binary Format:** WorldBox uses a proprietary binary format rather than JSON or XML to minimize file size and maximize read/write speed.
*   **State Compression:** The game likely uses **Run-Length Encoding (RLE)** for tile data, as large patches of the map often consist of the same tile type (e.g., Deep Ocean).
*   **Delta-Loading/Chunking:** Large maps may be saved in chunks, allowing the game to load metadata (world name, population, screenshot) without reading the entire simulation state.

### **Steam Workshop Integration**
*   The transition to Steam necessitated a portable and robust save format that handles versioning, allowing older saves (pre-0.13 tile rework) to be migrated to newer data structures via a "Map Loader" conversion layer.


## 📊 报告三：市场分析 (Market Analysis)

# WorldBox Market Analysis & Business Performance (February 2026)

## 1. Estimated Steam Sales and Active Player Count
*   **Total Sales (Steam):** Estimated between **1.5 million and 2.5 million units**. Data from SteamDB and Gamalytic indicates a strong long-tail performance since its Steam release in late 2021.
*   **Active Player Count:** 
    *   **Concurrent Users (CCU):** Consistently maintains between **2,000 and 4,500 players** daily.
    *   **Engagement:** The game sees significant spikes during "Major Updates" (e.g., the Biome update, Culture update), often jumping to 10,000+ CCU.
*   **Revenue (PC):** With a base price of **$19.99**, the PC version has likely generated gross revenue in excess of **$30M - $40M** (before Valve's 30% cut and regional pricing adjustments).

## 2. Mobile (F2P/IAP) vs. PC (Premium) Model Comparison
WorldBox operates a highly successful hybrid distribution model that leverages the strengths of both platforms.

| Feature | Mobile (Android/iOS) | PC (Steam/Humble) |
| :--- | :--- | :--- |
| **Monetization** | **Freemium:** Free to play basic version; one-time "Premium" IAP (~$7.99) to unlock all powers. | **Premium:** One-time purchase ($19.99). |
| **Reach** | **Massive:** 50M+ downloads on Android alone. | **Niche/Quality:** Focused on power users and map creators. |
| **Performance** | Limited by mobile hardware (smaller world sizes). | **Iceberg-sized worlds**, better CPU optimization. |
| **Content** | Temporary power unlocks via Ads (rewarded video). | Full access, **Steam Workshop** support for mods/maps. |

**Key Insight:** The mobile version acts as a massive "top-of-funnel" marketing tool. Millions play the free version, and many eventually "graduate" to the PC version for a more stable, moddable, and high-performance experience.

## 3. Competitive Landscape
WorldBox dominates the "God Simulator" niche by focusing on simulation depth over directed gameplay.

*   **Godus (22Cans):** Largely considered "abandoned" and a failure in community management. WorldBox captured the disillusioned Godus audience by providing a true sandbox without heavy-handed microtransactions.
*   **Galimulator:** A strong competitor in "high-level simulation," but focuses on space/political borders rather than the pixel-art biological simulation of WorldBox.
*   **Reus / Reus 2:** More "game-ified" with specific objectives and puzzles. WorldBox remains the preferred choice for players who want pure "chaos experimentation."
*   **Galactory:** A notable mobile competitor that is often criticized by the community for being a "clone." Despite this, it holds a small segment of the mobile market.

## 4. Marketing Strategy and Viral Growth Factors
WorldBox's growth is a case study in **Organic Community Virality**:

*   **The "Lone Developer" Narrative:** Maxim Karpenko's direct engagement with the community (Reddit/Discord) creates a "human connection" that large studios lack. The community feels protective of the game.
*   **YouTube Ecosystem:** The game's chaotic nature makes it "stream-bait." Influencers like *GrayStillPlays* and *The Spiffing Brit* helped drive millions of views by testing the game's limits (e.g., "Can 1,000 bears survive a volcano?").
*   **TikTok/Shorts:** The visual satisfaction of watching a "Grey Goo" or "Antimatter Bomb" erase a civilization is perfect for short-form video content.
*   **Deep Lore & Memes:** The community creates its own narratives (e.g., the "cult of the boat," the "crabzilla" memes), which keeps engagement high between updates.
*   **No Aggressive Marketing:** WorldBox relies almost entirely on word-of-mouth and organic search rankings, maintaining a high ROAS (Return on Ad Spend) by essentially spending $0 on traditional paid acquisition.

*本报告合集由面包 (Bread) 整理。*
