import json
from pathlib import Path

import matplotlib.pyplot as plt


PAPERS_FILE = Path("papers.json")
OUTPUT_FILE = Path("papers_scored.json")
GRAPH_FILE = Path("paper_rankings.png")


def calculate_weighted_score(paper):
    fit_scores = paper.get("fit_scores", {})
    weights = paper.get("weights", {})

    total_score = 0

    for variable, weight in weights.items():
        score = fit_scores.get(variable, 0)
        total_score += score * weight

    return round(total_score, 2)


def assign_selection_category(weighted_score):
    if weighted_score >= 4.25:
        return "core"
    elif weighted_score >= 3.50:
        return "keep"
    elif weighted_score >= 2.75:
        return "maybe"
    else:
        return "drop / background only"


def assign_selection_decision(category):
    decisions = {
        "core": "Use as a core paper for the thesis.",
        "keep": "Keep as a strong supporting paper.",
        "maybe": "Use selectively, mainly for theory or background.",
        "drop / background only": "Do not use as a core paper. Keep only if needed for background."
    }

    return decisions.get(category, "pending review")


def score_papers(papers):
    scored_papers = []

    for paper in papers:
        weighted_score = calculate_weighted_score(paper)
        category = assign_selection_category(weighted_score)
        decision = assign_selection_decision(category)

        paper["weighted_score_0_5"] = weighted_score
        paper["selection_category"] = category
        paper["selection_decision"] = decision

        scored_papers.append(paper)

    scored_papers.sort(
        key=lambda paper: paper["weighted_score_0_5"],
        reverse=True
    )

    return scored_papers


def create_ranking_graph(scored_papers, top_n=30):
    top_papers = scored_papers[:top_n]

    labels = [
        f"{paper['paper_id']} | {paper['title'][:55]}"
        for paper in top_papers
    ]

    scores = [
        paper["weighted_score_0_5"]
        for paper in top_papers
    ]

    categories = [
        paper["selection_category"]
        for paper in top_papers
    ]

    category_colors = {
        "core": "#1f77b4",
        "keep": "#2ca02c",
        "maybe": "#ff7f0e",
        "drop / background only": "#7f7f7f"
    }

    colors = [
        category_colors.get(category, "#7f7f7f")
        for category in categories
    ]

    plt.figure(figsize=(14, max(8, top_n * 0.35)))
    plt.barh(labels, scores, color=colors)
    plt.xlabel("Weighted score / 5")
    plt.ylabel("Papers")
    plt.title(f"Top {top_n} Thesis Paper Rankings")
    plt.xlim(0, 5)
    plt.gca().invert_yaxis()

    for index, score in enumerate(scores):
        plt.text(score + 0.03, index, str(score), va="center")

    plt.tight_layout()
    plt.savefig(GRAPH_FILE, dpi=300)
    plt.close()


def main():
    if not PAPERS_FILE.exists():
        raise FileNotFoundError(
            f"Could not find {PAPERS_FILE}. Make sure papers.json is in the same folder as this script."
        )

    with PAPERS_FILE.open("r", encoding="utf-8") as file:
        papers = json.load(file)

    scored_papers = score_papers(papers)

    with OUTPUT_FILE.open("w", encoding="utf-8") as file:
        json.dump(scored_papers, file, indent=2, ensure_ascii=False)

    create_ranking_graph(scored_papers, top_n=30)

    print("Scoring complete.")
    print(f"Input file: {PAPERS_FILE}")
    print(f"Output file: {OUTPUT_FILE}")
    print(f"Graph file: {GRAPH_FILE}")
    print()

    for paper in scored_papers:
        print(
            f"{paper['paper_id']} | "
            f"{paper['weighted_score_0_5']} / 5 | "
            f"{paper['selection_category']} | "
            f"{paper['title']}"
        )


if __name__ == "__main__":
    main()