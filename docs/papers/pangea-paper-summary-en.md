# PANGeA: Procedural Artificial Narrative using Generative AI for Turn-Based, Role-Playing Video Games

## Paper Information

**Authors:** Steph Buongiorno, Lawrence Klinkert, Zixin Zhaung, Tanishq Chawla, Corey Clark

**Affiliation:** 
- Guildhall, Southern Methodist University
- Department of Computer Science, Southern Methodist University

**Conference:** Proceedings of the Twentieth AAAI Conference on Artificial Intelligence and Interactive Digital Entertainment (AIIDE 2024)

**arXiv ID:** 2404.19721

**Pages:** 11 pages

**Access:** 
- [arXiv Abstract](https://arxiv.org/abs/2404.19721)
- [arXiv PDF](https://arxiv.org/pdf/2404.19721)
- [AAAI Official Page](https://ojs.aaai.org/index.php/AIIDE/article/view/31876)

---

## Abstract

Large language models (LLMs) offer unprecedented flexibility in procedural generation, enabling the creation of dynamic video game storylines that evolve with user input. A critical aspect of realizing this potential is allowing players and developers to provide dynamic or free-form text to drive generation. However, ingesting free-form text for a video game poses challenges, as it can prompt the LLM to generate content beyond the intended narrative scope.

This research introduces **PANGeA** (Procedural Artificial Narrative using Generative AI) for leveraging LLMs to create narrative content for turn-based, role-playing games (RPGs). PANGeA comprises:
- A custom memory system (based on the Atkinson-Shiffrin model)
- A novel validation system
- A Unity game engine plug-in
- A server with a RESTful interface

Key findings:
- With the validation system, **Llama-3 (8B)'s performance improved from 28% accuracy to 98%**
- **GPT-4's performance improved from 71% to 99%**
- PANGeA enables smaller models to perform comparably to large-scale foundational models

---

## Paper Structure

### 1. Introduction
- Challenges of using LLMs for game narrative generation
- Overview of PANGeA's approach and components
- Research goals and evaluation methodology

### 2. Background
- **AI-Assisted Content Creation**: Review of procedural content generation techniques
- **Personality Theory**: Application of Big Five Personality Model in NPC design
- **LLMs and Limited Context Memory**: Challenges of context management in narrative generation

### 3. PANGeA System

#### 3.1 Prompt Schema
- Structured prompt design for game initialization and gameplay
- Multi-step prompting sequence with five key prompts:
  1. Generate Gameplay Rules
  2. Generate Narrative Setting
  3. Generate Player Persona
  4. Generate NPCs
  5. Generate Narrative Beats

#### 3.2 Server Architecture
- REST API interface for game engine integration
- Compatibility with local and cloud-based LLMs
- Support for OpenAI API-compatible models

#### 3.3 Memory System
- Short-term memory: Cached raw data of recent conversations and actions
- Long-term memory: Summarized past conversations stored in vector database (ChromaDB)
- Semantic search using cosine similarity for memory retrieval
- Separate memory instances for each NPC

#### 3.4 Validation System
- **Core Innovation**: Self-reflective validation process
- Generates gameplay rules based on designer's criteria
- Evaluates free-form text input against game rules
- Iterative refinement process to align LLM responses with narrative
- Handles two categories of out-of-scope responses:
  - **Off Topic**: Temporal, Regional, Generic deviations
  - **Cheating**: Prompt Leaking, Future Sight, Physics Violations, NPC Hacking, Unauthorized Skills

### 4. Dark Shadows: Narrative Test Scenario
- Film Noir-style detective game prototype
- Demonstrates dynamic content generation
- Shows NPC memory and personality-based interactions
- Examples of validation system in action

### 5. Evaluation of Validation System

#### 5.1 Evaluation Criteria
- Off Topic responses (Temporal, Regional, Generic)
- Cheating attempts (5 categories)

#### 5.2 Methodology
- Inter-rater agreement study with human evaluators and GPT-4
- High agreement between human evaluators and GPT-4 assessments

#### 5.3 Ablation Study
- Tested across 10 different RPG scenarios (western to science fiction)
- Compared three model sizes: Llama-3 (8B), GPT-3.5, GPT-4
- Compared three conditions:
  1. Baseline (no validation)
  2. Partial validation (dynamic rules only)
  3. Full validation (dynamic rules + self-reflection)

#### 5.4 Results
- Validation system significantly improves all models
- Llama-3 (8B) with full validation performs comparably to GPT-4 baseline
- Demonstrates potential for running smaller models on various devices

### 6. Discussion
- Validation system enhances smaller LLM performance
- Potential for quantized models on mobile devices
- Guidance feature helps players learn game rules
- Implications for accessible AI-powered game development

### 7. Limitations
- Subject to underlying LLM biases
- Not designed as comprehensive anti-cheat technology
- Does not account for all possible out-of-scope inputs
- Ethical considerations for personality-biased NPCs need further exploration

### 8. Conclusion
- PANGeA represents a meaningful step forward in generative AI integration for game design
- Modular architecture facilitates broader adoption
- Enables creation of responsive game worlds with narrative coherence
- Opens possibilities for accessible LLM-powered game development

---

## Key Technical Contributions

1. **Novel Validation System**: Self-reflective mechanism that aligns LLM outputs with game narrative
2. **Custom Memory System**: Atkinson-Shiffrin model-based approach for managing context
3. **Personality-Biased NPCs**: Integration of Big Five Personality Model for dynamic character interactions
4. **Modular Architecture**: RESTful interface enabling integration with any game engine
5. **Performance Enhancement**: Enables smaller models to achieve performance comparable to larger models

---

## References

The paper includes 40+ references covering:
- Procedural content generation
- Interactive storytelling
- Personality psychology
- LLM applications in games
- Memory-augmented models
- Evaluation methodologies

---

## Related Resources

- **Project Homepage**: [https://stephbuon.github.io/pangea](https://stephbuon.github.io/pangea)
- **GitLab Repository**: https://gitlab.com/humin-game-lab/pangea
- **Dark Shadows Demo**: https://chatgpt.com/g/g-RhmfY1KJR-dark-shadows-gpt
- **Dark Shadows Project Page**: https://www.smu.edu/guildhall/academics/research/dark-shadows
- **AIIDE 2024 Video**: https://www.youtube.com/watch?v=aSsZkdjltwc

---

**Note:** This is a summary and structural overview of the paper. For complete technical details, mathematical formulations, and experimental data, please refer to the original paper via the links provided above.
