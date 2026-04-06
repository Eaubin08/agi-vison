--------------------------- MODULE X108_Core ---------------------------
EXTENDS Integers, Sequences, FiniteSets

(* 
  Spécification formelle du Protocole de Veto Obsidia X-108.
  Définit les invariants de sécurité entre le Noyau Cognitif et le Juge.
*)

VARIABLES 
    cognitive_state,  (* État de l'IA dans l'Espace Latent *)
    judge_decision,   (* Décision du Juge Déterministe *)
    sealed_memory     (* Mémoire scellée immuable *)

(* Invariants de Sécurité *)
TypeOK == 
    /\ cognitive_state \in {"IDLE", "PROPOSING", "DRIFTING"}
    /\ judge_decision \in {"PENDING", "ALLOWED", "BLOCKED"}
    /\ sealed_memory \in SUBSET(Strings)

(* Propriété de Sûreté : Aucune dérive ne peut être scellée *)
Safety == 
    \A prop \in cognitive_state : 
        (prop = "DRIFTING") => (judge_decision /= "ALLOWED")

-----------------------------------------------------------------------------
=============================================================================
