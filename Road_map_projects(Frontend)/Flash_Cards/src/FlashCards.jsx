import React from "react";

function FlashCards({card, showAnswer, toggleAnswer}){

    return (
        <div className={`flashcard ${showAnswer ? `show-answer` : ``}`} onClick={toggleAnswer}>
            <div className="flashcard-inner">
                <div className="flashcard-front">
                    <h3>Question</h3>
                    <p>{card.question}</p>
                </div>
                <div className="flashcard-back">
                    <h3>Answer</h3>
                    <p>{card.answer}</p>
                </div>
            </div>
        </div>
    )
}

export default FlashCards