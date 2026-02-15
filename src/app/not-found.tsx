import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-parchment flex items-center justify-center px-4">
      <div className="text-center max-w-lg">
        <div className="text-8xl mb-4">🧙‍♂️</div>
        <h1 className="font-heading text-4xl sm:text-5xl text-shire-ink mb-4">
          You&apos;ve Strayed From the Path
        </h1>
        <p className="text-lg text-shire-brown mb-8">
          &ldquo;It&apos;s a dangerous business, Frodo, going out your door. 
          You step onto the road, and if you don&apos;t keep your feet, 
          there&apos;s no knowing where you might be swept off to.&rdquo;
        </p>
        <p className="text-shire-brown/70 mb-8">
          The page you&apos;re looking for doesn&apos;t exist in the Shire.
        </p>
        <Link
          href="/"
          className="inline-block px-8 py-3 bg-shire-green text-white rounded-lg font-heading hover:bg-shire-dark-green transition-colors"
        >
          Return to the Shire
        </Link>
      </div>
    </div>
  );
}
