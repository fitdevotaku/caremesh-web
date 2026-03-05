# CareMesh Web

CareMesh Web is the frontend interface for the CareMesh system.
It is built with React and TypeScript and designed carefully from the start. The goal is not to rush features or make screens appear. The goal is to build a system that can grow into real healthcare partnerships and real operational complexity.

Healthcare access breaks down more often than people realize. Medications become discontinued locally. Pharmacies lose visibility into supplier networks. Patients are left searching pharmacy to pharmacy trying to locate medications that may still exist somewhere upstream in the supply chain.

CareMesh approaches the problem from a systems perspective.

Instead of asking patients to search endlessly for medication, the system is designed to search fulfillment paths on their behalf. That means understanding relationships between manufacturers, suppliers, pharmacies, and regional availability. The platform models those relationships so requests can eventually be routed intelligently rather than guessed.

This repository represents the web layer of that system.

CareMesh Web acts as the user facing surface where patients, partners, and eventually healthcare operators can interact with the platform. The interface is intentionally built with clear boundaries so it can evolve safely as the backend system grows.

The structure of the frontend follows a simple rule. Features own behavior. Pages remain thin.

Each feature is treated as a bounded unit with its own types, state, and rendering logic. This prevents the system from collapsing into large unmaintainable components as the product expands.

The folder structure reflects intent, not convenience.

Pages define routes and mount features.
Features contain behavior and state.
Shared UI stays isolated.
No abstractions exist unless they earn their place.

Early development intentionally avoided authentication, APIs, and external integrations. The focus was system structure, naming, and responsibility boundaries first. This ensures the system grows in a controlled way rather than accumulating technical debt early.

## Current Development State

The system currently includes an early feature called **Browse**.

Browse is the public lobby of the platform.

It allows users to search medications by name and view basic descriptions along with coarse availability signals. It exists to give people visibility into what may exist in the system without requiring trust, accounts, or partner integration.

Browse is intentionally limited.

It does not support ordering.
It does not expose inventory truth.
It does not connect to real pharmacy systems.
It does not require authentication.

Those capabilities come later once partnerships and infrastructure are in place.

The feature currently includes typed domain definitions, mock data used only for local development, and a functional UI that renders search results and medication details.

The interface already supports search state, selection state, and clear user messaging. When users attempt to move beyond browsing, the system makes it clear that ordering requires an account and verified partners.

The UI currently renders a search input, a results list, and a medication details panel. A small usability issue around text contrast was identified during manual testing and corrected immediately. Trust in healthcare software starts with clarity and usability.

## Architectural Approach

CareMesh Web is built around a few simple rules that guide every change.

Structure before logic.
Names before code.
One feature at a time.
Features own behavior.
Pages stay thin.
No giant components.
No guessing future needs.

Every file must earn its existence.

The system is intentionally being built as a clean foundation rather than a quick prototype. The expectation is that this interface will eventually sit on top of a much larger backend system that models supply chains, pharmacies, manufacturers, and fulfillment paths.

## Current Stopping Point

The Browse feature represents the first honest vertical slice of the system.

Types exist.
State exists.
UI exists.
Boundaries remain intact.

This is a deliberate stopping point.

Moving further would require decisions around routing, authentication, backend adapters, and partner integrations. Those decisions will be made once the current slice is stable and understood.

## Next Development Focus

The next phase of work will begin inside the Browse feature.

The goals are to refine the feature’s public interface, introduce routing in a controlled way, and prepare the system to swap mock data with real backend adapters.

Location awareness and pharmacy context will eventually enter the system as well. That work will only begin once the current structure proves stable.

CareMesh is still early.

But the foundation is being laid carefully so the system can grow into something real rather than collapsing under its own complexity.
