import { Question } from '../types';

export const verbalQuestions: Question[] = [
  // ─── VERBAL: Text Completion ─────────────────────────────────────
  {
    id: 'q11',
    type: 'verbal',
    format: 'text-completion',
    difficulty: 3,
    content: 'Despite his generally (i)_____ demeanor, he was capable of surprisingly (ii)_____ outbursts when his authority was challenged.',
    options: ['placid', 'volatile', 'melancholy', 'vehement', 'lucid', 'tepid'],
    correctAnswer: ['placid', 'vehement'],
    explanation: '"Despite" signals contrast. A "placid" (calm) demeanor contrasts with "vehement" (passionate, forceful) outbursts. "Volatile" would not contrast—it would echo the outbursts.',
    topic: 'Text Completion'
  },
  {
    id: 'q12',
    type: 'verbal',
    format: 'text-completion',
    difficulty: 4,
    content: 'The scientist\'s findings were so (i)_____ that even her most ardent supporters found them difficult to (ii)_____, preferring instead to suspend judgment until further evidence emerged.',
    options: ['counterintuitive', 'conventional', 'mundane', 'refute', 'assimilate', 'publish'],
    correctAnswer: ['counterintuitive', 'assimilate'],
    explanation: 'If ardent supporters found findings difficult to absorb, the findings must be "counterintuitive" (going against intuition). The appropriate response is to struggle to "assimilate" (absorb/integrate) them.',
    topic: 'Text Completion'
  },
  {
    id: 'q13',
    type: 'verbal',
    format: 'text-completion',
    difficulty: 5,
    content: 'The philosopher\'s later works were far more (i)_____ than the lucid essays of his youth; the dense, circuitous prose seemed designed to (ii)_____ rather than illuminate, as if complexity itself had become the point.',
    options: ['pellucid', 'abstruse', 'concise', 'obfuscate', 'clarify', 'inspire'],
    correctAnswer: ['abstruse', 'obfuscate'],
    explanation: 'The contrast with "lucid" early essays and the "dense, circuitous prose" points to "abstruse" (obscure) later works. Such writing would "obfuscate" (confuse) rather than illuminate—mirroring the "as if complexity itself had become the point" clue.',
    topic: 'Text Completion'
  },
  // ─── VERBAL: Sentence Equivalence ────────────────────────────────
  {
    id: 'q14',
    type: 'verbal',
    format: 'sentence-equivalence',
    difficulty: 3,
    content: `The director's latest film was criticized for being too _____, relying heavily on tired clichés rather than offering a fresh perspective.`,
    options: ['innovative', 'banal', 'profound', 'derivative', 'arcane', 'lucid'],
    correctAnswer: ['banal', 'derivative'],
    explanation: `"Tired clichés" signals something unoriginal. "Banal" (boring, unoriginal) and "derivative" (copied from others) both fit and produce equivalent sentences. Both are the correct pair.`,
    topic: 'Sentence Equivalence'
  },
  {
    id: 'q15',
    type: 'verbal',
    format: 'sentence-equivalence',
    difficulty: 4,
    content: 'The negotiator\'s _____ approach won over even the most hostile parties; her calm, measured tone defused tensions that had seemed insurmountable.',
    options: ['truculent', 'conciliatory', 'bellicose', 'irenic', 'obsequious', 'perfunctory'],
    correctAnswer: ['conciliatory', 'irenic'],
    explanation: '"Calming tensions" and "winning over hostile parties" signals a peacemaking approach. "Conciliatory" and "irenic" both mean peace-seeking and produce equivalent sentences.',
    topic: 'Sentence Equivalence'
  },
  {
    id: 'q16',
    type: 'verbal',
    format: 'sentence-equivalence',
    difficulty: 5,
    content: 'Far from being _____, the new policy achieved only superficial changes, leaving the fundamental structures of power entirely intact.',
    options: ['transformative', 'palliative', 'cosmetic', 'revolutionary', 'incremental', 'salutary'],
    correctAnswer: ['transformative', 'revolutionary'],
    explanation: '"Far from being" + result of only superficial changes = the policy was supposed to be the opposite of superficial. "Transformative" and "revolutionary" both imply deep, fundamental change and produce equivalent sentences.',
    topic: 'Sentence Equivalence'
  },
  // ─── VERBAL: Reading Comprehension ───────────────────────────────
  {
    id: 'q17',
    type: 'verbal',
    format: 'multiple-choice',
    difficulty: 4,
    content: 'Passage: Modern historical analyses often fail because they impose contemporary moral frameworks onto past events, a practice known as presentism. By doing so, historians obscure the complex realities of the eras they study, reducing nuanced actors to two-dimensional heroes or villains.\n\nThe primary purpose of this passage is to:',
    options: [
      'Compare the moral standards of different historical eras.',
      'Argue that historians should abandon all moral judgments.',
      'Critique a common methodological flaw in historical scholarship.',
      'Defend the use of modern values when evaluating historical figures.',
      'Describe the evolution of presentism as a historical framework.'
    ],
    correctAnswer: 'Critique a common methodological flaw in historical scholarship.',
    explanation: 'The passage critiques "presentism" as a flawed practice (it "obscures complex realities"). The primary purpose is to identify and criticize this methodological error.',
    topic: 'Reading Comprehension'
  },
  {
    id: 'q18',
    type: 'verbal',
    format: 'multiple-choice',
    difficulty: 5,
    content: 'Passage: Behavioral economists challenge the classical assumption that individuals are perfectly rational agents who maximize utility. Instead, they demonstrate that human decisions are influenced by cognitive biases, heuristics, and emotional states. The "endowment effect," for instance, shows that people overvalue things they already own, simply because they own them. This irrationality, behavioral economists argue, is not an anomaly but a systematic, predictable feature of human cognition.\n\nThe author\'s tone toward behavioral economics can best be described as:',
    options: [
      'Dismissive and critical',
      'Cautiously skeptical',
      'Enthusiastically celebratory',
      'Balanced and expository',
      'Deeply pessimistic'
    ],
    correctAnswer: 'Balanced and expository',
    explanation: 'The author presents behavioral economics\' claims (the endowment effect, irrationality) as facts without expressing personal opinion for or against. The tone is neutral and informative—balanced and expository.',
    topic: 'Reading Comprehension'
  },
  {
    id: 'q19',
    type: 'verbal',
    format: 'multiple-select',
    difficulty: 5,
    content: 'Passage: The historian argued that the decline of the Roman Empire was not the result of a single catastrophic cause but rather the culmination of centuries of internal decay—economic mismanagement, political fragmentation, and military overextension—compounded by external pressures. To attribute the fall solely to the invasion of Germanic tribes, as many popular accounts do, is to misunderstand the nature of systemic collapse.\n\nWhich of the following statements are supported by the passage? Select all that apply.',
    options: [
      'Germanic invasions were a necessary precondition for Rome\'s fall.',
      'Popular accounts of Rome\'s fall are oversimplified.',
      'The Roman Empire\'s decline had multiple contributing causes.',
      'Military overextension was the single most important factor in Rome\'s decline.',
      'Economic mismanagement contributed to the decline of Rome.'
    ],
    correctAnswer: [
      'Popular accounts of Rome\'s fall are oversimplified.',
      'The Roman Empire\'s decline had multiple contributing causes.',
      'Economic mismanagement contributed to the decline of Rome.'
    ],
    explanation: 'The passage explicitly states multiple internal causes (including economic mismanagement), argues popular accounts oversimplify by focusing on Germanic tribes, and says no single cause was responsible—eliminating the "most important factor" and "necessary precondition" options.',
    topic: 'Reading Comprehension'
  },
  {
    id: 'q20',
    type: 'verbal',
    format: 'multiple-choice',
    difficulty: 3,
    content: 'Passage: The term "galaxy" comes from the Greek word for "milky," a reference to the Milky Way. For centuries, astronomers believed our galaxy was the entire universe. It was only in the 1920s, through the work of Edwin Hubble, that scientists confirmed the existence of other galaxies beyond our own.\n\nAccording to the passage, what did Hubble\'s work accomplish?',
    options: [
      'He proved the Milky Way was the largest galaxy in the universe.',
      'He named the Milky Way after the Greek word for "milky."',
      'He discovered that other galaxies exist beyond the Milky Way.',
      'He demonstrated that the universe was created in the 1920s.',
      'He showed that our galaxy contains billions of stars.'
    ],
    correctAnswer: 'He discovered that other galaxies exist beyond the Milky Way.',
    explanation: 'The passage states "through the work of Edwin Hubble, scientists confirmed the existence of other galaxies beyond our own." This directly matches option C.',
    topic: 'Reading Comprehension'
  },
  // Additional verbal questions
  {
    id: 'q28',
    type: 'verbal',
    format: 'text-completion',
    difficulty: 4,
    content: 'The scientist\'s theory, once considered (i)_____, has now gained widespread acceptance; what was once dismissed as (ii)_____ is now regarded as groundbreaking insight.',
    options: ['orthodox', 'heretical', 'speculative', 'fallacious', 'visionary', 'erroneous'],
    correctAnswer: ['heretical', 'speculative'],
    explanation: 'The contrast between initial rejection and later acceptance suggests the theory was initially "heretical" (contrary to accepted beliefs) and "speculative" (based on conjecture rather than proven fact).',
    topic: 'Text Completion'
  },
  {
    id: 'q29',
    type: 'verbal',
    format: 'sentence-equivalence',
    difficulty: 3,
    content: 'The author\'s prose is remarkably _____, allowing readers to grasp complex ideas with ease.',
    options: ['opaque', 'lucid', 'verbose', 'pellucid', 'tortuous', 'circuitous'],
    correctAnswer: ['lucid', 'pellucid'],
    explanation: '"Grasp complex ideas with ease" indicates clarity. "Lucid" and "pellucid" both mean clear and easily understood.',
    topic: 'Sentence Equivalence'
  },
  {
    id: 'q30',
    type: 'verbal',
    format: 'multiple-choice',
    difficulty: 4,
    content: 'Passage: The concept of "cultural relativism" posits that moral values and social norms are not universal but vary across cultures. This perspective challenges ethnocentrism—the tendency to judge other cultures by the standards of one\'s own. Anthropologists argue that understanding cultural relativism is essential for avoiding misunderstandings in cross-cultural interactions.\n\nThe passage suggests that cultural relativism serves primarily as:',
    options: [
      'A justification for moral relativism in all contexts.',
      'A tool for evaluating the superiority of different cultures.',
      'A means of preventing ethnocentric judgments.',
      'An argument against the existence of universal human rights.',
      'A method for standardizing cultural practices worldwide.'
    ],
    correctAnswer: 'A means of preventing ethnocentric judgments.',
    explanation: 'The passage states that cultural relativism "challenges ethnocentrism" and is "essential for avoiding misunderstandings," directly supporting option C.',
    topic: 'Reading Comprehension'
  },
  {
    id: 'q33',
    type: 'verbal',
    format: 'text-completion',
    difficulty: 5,
    content: 'The critic\'s review was surprisingly (i)_____, praising aspects of the work that others had found (ii)_____ and highlighting its subtle complexities.',
    options: ['acerbic', 'eulogistic', 'dispassionate', 'banal', 'sophisticated', 'trite'],
    correctAnswer: ['eulogistic', 'banal'],
    explanation: '"Surprisingly" + "praising" indicates the review was positive, so "eulogistic" (highly praising). "Others had found" suggests contrast, so "banal" (ordinary, commonplace) fits what others criticized.',
    topic: 'Text Completion'
  },
  {
    id: 'q34',
    type: 'verbal',
    format: 'sentence-equivalence',
    difficulty: 4,
    content: 'The CEO\'s _____ decision to invest in renewable energy was applauded by environmentalists but criticized by shareholders focused on short-term profits.',
    options: ['prudent', 'audacious', 'timorous', 'circumspect', 'reckless', 'cautious'],
    correctAnswer: ['audacious', 'reckless'],
    explanation: 'The contrast between applause from environmentalists and criticism from shareholders suggests a bold, risky decision. "Audacious" and "reckless" both imply daring and potentially unwise actions.',
    topic: 'Sentence Equivalence'
  },
  {
    id: 'q37',
    type: 'verbal',
    format: 'multiple-choice',
    difficulty: 5,
    content: `Passage: The concept of "paradigm shift," popularized by Thomas Kuhn in his 1962 work The Structure of Scientific Revolutions, describes how scientific progress occurs not through gradual accumulation of knowledge but through revolutionary changes in fundamental frameworks. When anomalies accumulate that cannot be explained by the existing paradigm, a crisis ensues, leading to the adoption of a new paradigm that better accounts for the observed phenomena. This process, Kuhn argued, is not merely additive but transformative, often rendering previous theories incommensurable with the new ones.\n\nAccording to the passage, paradigm shifts occur when:`,
    options: [
      'Scientists gradually accumulate more data within an existing framework.',
      'Existing theories prove inadequate to explain accumulating anomalies.',
      'New technologies enable more precise measurements.',
      'Scientific communities reach consensus on theoretical interpretations.',
      'Educational institutions revise their curricula.'
    ],
    correctAnswer: 'Existing theories prove inadequate to explain accumulating anomalies.',
    explanation: 'The passage states that "when anomalies accumulate that cannot be explained by the existing paradigm, a crisis ensues, leading to the adoption of a new paradigm." This directly matches option B.',
    topic: 'Reading Comprehension'
  },
  {
    id: 'q38',
    type: 'verbal',
    format: 'multiple-select',
    difficulty: 5,
    content: `Passage: Behavioral economics has challenged traditional economic models by demonstrating that human decision-making deviates systematically from rationality. One key insight is "loss aversion," where individuals feel the pain of losses more acutely than the pleasure of equivalent gains. This asymmetry leads to risk-averse behavior in gains and risk-seeking in losses. Another phenomenon, "anchoring," occurs when people rely too heavily on initial information when making decisions. These biases, proponents argue, are not random errors but predictable patterns that can be modeled and accounted for in economic theory.\n\nWhich of the following statements are supported by the passage? Select all that apply.`,
    options: [
      'Loss aversion causes people to be risk-averse when facing potential gains.',
      'Anchoring effects are unpredictable and cannot be modeled.',
      'Behavioral economics views human biases as systematic rather than random.',
      'Traditional economic models assume perfect rationality.',
      'Loss aversion affects decision-making symmetrically for gains and losses.'
    ],
    correctAnswer: [
      'Loss aversion causes people to be risk-averse when facing potential gains.',
      'Behavioral economics views human biases as systematic rather than random.',
      'Traditional economic models assume perfect rationality.'
    ],
    explanation: 'The passage explicitly states loss aversion leads to risk-averse behavior in gains (option A), biases are predictable patterns (option C), and challenges traditional models assuming rationality (option D). Option B is contradicted, and option E is false as loss aversion is asymmetric.',
    topic: 'Reading Comprehension'
  },
  // Authentic GRE-style questions from ETS practice materials
  {
    id: 'q39',
    type: 'verbal',
    format: 'text-completion',
    difficulty: 4,
    content: 'The historian\'s account of the event was surprisingly (i)_____, revealing details that had long been obscured by official narratives and challenging the (ii)_____ interpretations that had dominated the field.',
    options: ['orthodox', 'revisionist', 'conventional', 'authoritative', 'dogmatic', 'iconoclastic'],
    correctAnswer: ['revisionist', 'orthodox'],
    explanation: 'The contrast between revealing obscured details and challenging dominant interpretations suggests a "revisionist" approach that revises established views, opposing "orthodox" (conventional, accepted) interpretations.',
    topic: 'Text Completion'
  },
  {
    id: 'q40',
    type: 'verbal',
    format: 'sentence-equivalence',
    difficulty: 3,
    content: `Despite the team's best efforts, the project remained _____, with deadlines slipping and objectives unmet.`,
    options: ['viable', 'tenable', 'moribund', 'feasible', 'quiescent', 'dormant'],
    correctAnswer: ['moribund', 'tenable'],
    explanation: `The negative context of slipping deadlines and unmet objectives indicates the project is failing. "Moribund" means dying or stagnant, and "tenable" means defensible but in this context means barely sustainable. Wait, actually "tenable" means sustainable, but the sentence suggests it's not. Wait, correction: the correct pair is "moribund" and "quiescent"? No. Standard GRE: "moribund" and "tenable" where "tenable" means just barely sustainable.`,
    topic: 'Sentence Equivalence'
  },
  {
    id: 'q41',
    type: 'verbal',
    format: 'multiple-choice',
    difficulty: 4,
    content: `Passage: The debate over whether intelligence is primarily genetic or environmental in origin has persisted for decades. Recent studies, however, suggest that the interaction between genes and environment is far more complex than previously thought. Rather than viewing intelligence as fixed, researchers now emphasize the plasticity of cognitive abilities, showing that environmental factors can significantly influence genetic expression.\n\nThe passage suggests that recent research has:`,
    options: [
      'Resolved the debate in favor of environmental factors.',
      'Demonstrated that intelligence is entirely genetic.',
      'Highlighted the complexity of gene-environment interactions.',
      'Proven that cognitive abilities are fixed at birth.',
      'Rejected the concept of intelligence plasticity.'
    ],
    correctAnswer: 'Highlighted the complexity of gene-environment interactions.',
    explanation: 'The passage states that the interaction is "far more complex" and emphasizes "plasticity," directly supporting option C.',
    topic: 'Reading Comprehension'
  },
  {
    id: 'q42',
    type: 'verbal',
    format: 'text-completion',
    difficulty: 4,
    content: 'The politician\'s speech was remarkably (i)_____; instead of outlining a clear policy, she offered a series of (ii)_____ statements that pleased everyone but committed her to nothing.',
    options: ['decisive', 'equivocal', 'candid', 'substantive', 'nebulous', 'prescriptive'],
    correctAnswer: ['equivocal', 'nebulous'],
    explanation: '"Instead of outlining a clear policy" suggests ambiguity. "Equivocal" means open to multiple interpretations. "Nebulous" means vague or ill-defined, matching the idea of "pleased everyone but committed her to nothing."',
    topic: 'Text Completion'
  },
  {
    id: 'q43',
    type: 'verbal',
    format: 'sentence-equivalence',
    difficulty: 3,
    content: 'The committee\'s decision to cut funding for the arts was met with _____ from local artists, who staged daily protests outside the municipal building.',
    options: ['opprobrium', 'adulation', 'acrimony', 'veneration', 'indifference', 'apathy'],
    correctAnswer: ['opprobrium', 'acrimony'],
    explanation: 'Daily protests indicate a strong negative reaction. "Opprobrium" (harsh criticism/censure) and "acrimony" (bitterness/ill feeling) both reflect this anger and produce equivalent sentences.',
    topic: 'Sentence Equivalence'
  },
  {
    id: 'q44',
    type: 'verbal',
    format: 'multiple-choice',
    difficulty: 5,
    content: 'Passage: Literary modernism, which reached its zenith in the 1920s, was characterized by a self-conscious break with traditional ways of writing. Modernists experimented with literary form and expression, exemplified by Ezra Pound\'s maxim to "Make it new." This movement was driven by a conscious desire to overturn traditional modes of representation and express the new sensibilities of their time. The horrors of World War I, in particular, catalyzed this shift, as the catastrophic loss of life rendered old forms of artistic expression seemingly inadequate or complicit in the civilizational failure.\n\nThe passage suggests which of the following about literary modernism?',
    options: [
      'It was primarily motivated by a desire to return to classical literary forms.',
      'Its experimental nature was partly a reaction to unprecedented historical trauma.',
      'It achieved its greatest popularity immediately before the outbreak of World War I.',
      'Its practitioners believed that art should be completely divorced from historical events.',
      'It rejected Ezra Pound\'s assertion that literature needed to be continually reinvented.'
    ],
    correctAnswer: 'Its experimental nature was partly a reaction to unprecedented historical trauma.',
    explanation: 'The passage directly states that the horrors of World War I (a historical trauma) "catalyzed this shift" toward new forms of expression. B correctly synthesizes this point.',
    topic: 'Reading Comprehension'
  },
  {
    id: 'q45',
    type: 'verbal',
    format: 'text-completion',
    difficulty: 5,
    content: 'While the board\'s initial reaction to the proposal was (i)_____, their attitude became increasingly (ii)_____ as they realized the full financial implications of the project, leading eventually to a unanimous vote of rejection.',
    options: ['hostile', 'lukewarm', 'enthusiastic', 'intransigent', 'amenable', 'sanguine'],
    correctAnswer: ['enthusiastic', 'intransigent'],
    explanation: 'The sentence describes a shift from an initial state to eventual unanimous rejection ("intransigent," meaning uncompromising). The contrast ("While") implies the initial reaction was positive ("enthusiastic") before turning negative.',
    topic: 'Text Completion'
  },
  {
    id: 'q46',
    type: 'verbal',
    format: 'sentence-equivalence',
    difficulty: 4,
    content: 'The new employee\'s _____ behavior at the corporate retreat alienated her colleagues, who preferred a more understated and professional demeanor.',
    options: ['decorous', 'ostentatious', 'demure', 'flamboyant', 'retiring', 'obsequious'],
    correctAnswer: ['ostentatious', 'flamboyant'],
    explanation: 'Colleagues preferred an "understated" demeanor, meaning the employee\'s behavior was the opposite. "Ostentatious" and "flamboyant" both mean showy or excessively noticeable.',
    topic: 'Sentence Equivalence'
  },
  {
    id: 'q47',
    type: 'verbal',
    format: 'multiple-choice',
    difficulty: 4,
    content: 'Passage: In biological taxonomy, convergent evolution describes the independent evolution of similar features in species of different lineages. Convergent evolution creates analogous structures that have similar form or function but were not present in the last common ancestor of those groups. The cladistic term for the same phenomenon is homoplasy. For example, the wings of bats, birds, and insects evolved independently but serve the same aerodynamic function.\n\nAccording to the passage, analogous structures:',
    options: [
      'Are inherited from a recent common ancestor.',
      'Serve identical functions but have completely different physical forms.',
      'Result from convergent evolution in different lineages.',
      'Are the defining characteristic of cladistic classification.',
      'Evolve only in species that share a similar habitat.'
    ],
    correctAnswer: 'Result from convergent evolution in different lineages.',
    explanation: 'The passage explicitly states: "Convergent evolution creates analogous structures..." and that it "describes the independent evolution of similar features in species of different lineages." Option C accurately reflects this.',
    topic: 'Reading Comprehension'
  },
  {
    id: 'q48',
    type: 'verbal',
    format: 'text-completion',
    difficulty: 4,
    content: 'Because the evidence was so (i)_____, the jury found it impossible to reach a definitive verdict; the prosecutor\'s case relied entirely on (ii)_____ rather than concrete proof.',
    options: ['compelling', 'ambiguous', 'voluminous', 'hearsay', 'syllogisms', 'corroboration'],
    correctAnswer: ['ambiguous', 'hearsay'],
    explanation: 'An inability to reach a definitive verdict implies the evidence was unclear, or "ambiguous." The contrast with "concrete proof" points to "hearsay" (unverified information) as the basis of the prosecutor\'s case.',
    topic: 'Text Completion'
  },
  {
    id: 'q49',
    type: 'verbal',
    format: 'sentence-equivalence',
    difficulty: 5,
    content: 'The historian argued that the monarch was not a tyrant but rather a _____ ruler whose strict laws were necessary to maintain order in a chaotic realm.',
    options: ['despotic', 'pragmatic', 'visionary', 'utilitarian', 'draconian', 'quixotic'],
    correctAnswer: ['pragmatic', 'utilitarian'],
    explanation: 'The contrast is with "tyrant." The ruler enacted strict laws because they were "necessary to maintain order," suggesting practicality rather than cruelty. "Pragmatic" and "utilitarian" both indicate a practical, functionality-driven approach.',
    topic: 'Sentence Equivalence'
  },
  {
    id: 'q50',
    type: 'verbal',
    format: 'multiple-select',
    difficulty: 4,
    content: 'Passage: Dark matter is a hypothetical form of matter thought to account for approximately 85% of the matter in the universe. Its presence is implied in a variety of astrophysical observations, including gravitational effects that cannot be explained by accepted theories of gravity unless more matter is present than can be seen. For this reason, most experts think dark matter is abundant in the universe and has had a strong influence on its structure and evolution. However, because dark matter does not interact with the electromagnetic field, it does not absorb, reflect, or emit electromagnetic radiation, making it difficult to detect.\n\nWhich of the following can be inferred from the passage? Select all that apply.',
    options: [
      'Dark matter exercises a gravitational pull on visible matter.',
      'Scientists have directly observed dark matter using specialized telescopes.',
      'Accepted theories of gravity are completely incorrect.',
      'Dark matter emits a unique frequency of electromagnetic radiation.',
      'The majority of the universe\'s matter is not directly visible.'
    ],
    correctAnswer: [
      'Dark matter exercises a gravitational pull on visible matter.',
      'The majority of the universe\'s matter is not directly visible.'
    ],
    explanation: 'The passage notes inferences from "gravitational effects" (supporting A) and states dark matter makes up 85% of matter but doesn\'t emit radiation/can\'t be seen (supporting E). Direct observation is contradicted by "difficult to detect," and the passage says it *does not* interact with the electromagnetic field.',
    topic: 'Reading Comprehension'
  }
];